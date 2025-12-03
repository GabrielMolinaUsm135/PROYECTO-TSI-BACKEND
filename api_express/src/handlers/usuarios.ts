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
    // Only accept and store the fields defined in the Usuario model: correo, password, id_rol
    const { correo, password, id_rol, tipo_usuario } = request.body;

    if (!correo || !password) {
        return response.status(400).json({ error: "Faltan datos: correo y/o password" });
    }

    try {
        const existente = await usuario.findOne({ where: { correo } });
        if (existente) {
            return response.status(409).json({ error: "El usuario ya existe" });
        }

        // Determine role id: prefer explicit id_rol, otherwise use tipo_usuario if numeric
        let roleId: number | null = null;
        if (id_rol !== undefined && id_rol !== null) {
            roleId = Number(id_rol);
        } else if (tipo_usuario !== undefined && !isNaN(Number(tipo_usuario))) {
            roleId = Number(tipo_usuario);
        }

        // Optional: verify the role exists if provided
        if (roleId) {
            const rolExist = await Rol.findByPk(roleId);
            if (!rolExist) return response.status(400).json({ error: "id_rol no válido" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const nuevoUser = await usuario.create({
            correo,
            password: hashed,
            id_rol: roleId,
        });

        const plain = nuevoUser.get({ plain: true }) as any;
        delete plain.password;

        // Add rol name to response if available, keep id_rol numeric
        if (roleId) {
            const rolObj = await Rol.findByPk(roleId);
            plain.rol = rolObj ? rolObj.getDataValue('nombre_rol') : null;
        } else {
            plain.rol = null;
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

export const ObtenerUsuarioPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await usuario.findByPk(id);
    if (!item) return response.status(404).json({ error: "Usuario no encontrado" });

    const data: any = item.toJSON();
    try {
      if (data.id_usuario) {
        const user = await usuario.findByPk(data.id_usuario);
        if (user) data.correo = user.getDataValue('correo');
      }
    } catch (e) {
      console.error('Error al obtener correo del usuario', e.message);
    }

    response.json({ data });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener usuario" });
  }
};

export const ActualizarUsuarioPorId = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        // Forzar que `id` sea numérico para buscar por la PK `id_usuario`.
        const idNum = Number(id);
        if (isNaN(idNum)) return response.status(400).json({ error: 'El id de usuario debe ser numérico' });

        const item = await usuario.findByPk(idNum);
        if (!item) return response.status(404).json({ error: "Usuario no encontrado" });
        await item.update(request.body);
        await item.save();
        response.json({ data: item });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error al actualizar usuario" });
    }
};