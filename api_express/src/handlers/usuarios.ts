import { Request, Response } from "express";
import usuario from "../models/usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {
 const { username, password } = request.body;
 const SECRET = process.env.SECRET_KEY
 try {
     // busca el usuario por el campo 'username'
    const user = await usuario.findOne({ where: { username } });
    if (!user) {
        return response.status(401).json({ error: "Usuario no encontrado" });
    }
    if (!bcrypt.compareSync(password, user.password)){
        return response.status(401).json({ error: "Contraseña incorrecta" });
    }
    // Al llegar aqui el usuario y la contraseña son correctos
    const token =  jwt.sign({username:user.username}, SECRET, {expiresIn:"1h"});
    response.json({token});
 } catch (error) {
    console.error("Error de login", error);
    response .status(500).json({ error: "Error interno del servidor" });
 }
}

export const crearUsuario = async (request: Request, response: Response) => {
    const {username, password, tipo_usuario} = request.body;
    if (!username || !password || !tipo_usuario) {
        response.status(400).json({ error: "Faltan datos" });
    }

    try {
        const existente = await usuario.findOne({ where: { username } });
        if (existente) {
            return response.status(409).json({ error: "El usuario ya existe" });
        }

        const nuevoUser = await usuario.create({
            username, password, tipo_usuario})
        response.status(201).json({message: "Usuario Creado Correctamente"});
        // como crear "username:""nombre", "password:""contraseña", "tipo_usuario:""A" o "P"
    } catch (error) {
        console.error("Error al registrar usuario", error);
        response.status(500).json({ error: "Error interno del servidor" });
    }
}

