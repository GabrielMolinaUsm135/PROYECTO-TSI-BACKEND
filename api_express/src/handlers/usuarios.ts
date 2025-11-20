import { Request, Response } from "express";
import usuario from "../models/usuario";
import Rol from "../models/rol";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {
 const { correo, password } = request.body;
 const SECRET = process.env.SECRET_KEY
 try {
    const user = await usuario.findOne({ where: { correo } });
    if (!user) {
        return response.status(401).json({ error: "Usuario no encontrado" });
    }
    if (!bcrypt.compareSync(password, user.password)){
        return response.status(401).json({ error: "Contraseña incorrecta" });
    }
    
    const token =  jwt.sign({ correo: user.correo, id: user.id_usuario }, SECRET, {expiresIn:"1h"});
    response.json({token});
 } catch (error) {
    console.error("Error de login", error);
    response .status(500).json({ error: "Error interno del servidor" });
 }
}



export const crearUsuario = async (request: Request, response: Response) => {
    
    const {
        correo,
        password,
        nombre,
        apellido_paterno,
        apellido_materno,
        telefono,
        direccion,
        rut,
        tipo_usuario,
        id_rol
    } = request.body;

    if (!correo || !password) {
        return response.status(400).json({ error: "Faltan datos: correo y/o password" });
    }

    try {
        const existente = await usuario.findOne({ where: { correo } });
        if (existente) {
            return response.status(409).json({ error: "El usuario ya existe" });
        }

        
        let roleId: number | null = null;
        if (id_rol) {
            roleId = Number(id_rol);
        } else if (tipo_usuario && !isNaN(Number(tipo_usuario))) {
            roleId = Number(tipo_usuario);
        }

        
        const hashed = await bcrypt.hash(password, 10);

        const nuevoUser = await usuario.create({
            correo,
            password: hashed,
            nombre: nombre ?? null,
            apellido_paterno: apellido_paterno ?? null,
            apellido_materno: apellido_materno ?? null,
            telefono: telefono ?? null,
            direccion: direccion ?? null,
            rut: rut ?? null,
            id_rol: roleId,
        });

        
        const plain = nuevoUser.get({ plain: true }) as any;
        delete plain.password;

        
        if (roleId) {
            try {
                const role = await Rol.findByPk(roleId);
                if (role) {
                    // replace numeric id with role string
                    plain.id_rol = role.getDataValue("nombre_rol");
                }
            } catch (err) {
                console.warn("No se pudo resolver nombre de rol:", err);
            }
        }

        response.status(201).json({ message: "Usuario Creado Correctamente", data: plain });
    } catch (error) {
        console.error("Error al registrar usuario", error);
        response.status(500).json({ error: "Error interno del servidor" });
    }
}

export const ListarUsuarios = async (request: Request, response: Response) => {
    try {
        const users = await usuario.findAll({
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: Rol,
                    attributes: ["nombre_rol"],
                },
            ],
        });

        const mapped = users.map(u => {
            const plain = u.get({ plain: true }) as any;
            if (plain.rol && plain.rol.nombre_rol) {
                // replace nested rol object with string
                plain.rol = plain.rol.nombre_rol;
            } else {
                plain.rol = null;
            }
            return plain;
        });

        response.json({ data: mapped });
    } catch (error) {
        console.error("Error listando usuarios", error);
        response.status(500).json({ error: "Error interno del servidor" });
    }
}

