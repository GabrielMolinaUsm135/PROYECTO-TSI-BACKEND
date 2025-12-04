import { Request, Response } from "express";
import imagenes from "../models/imagenes";
import usuario from "../models/usuario";
import Rol from "../models/rol";
import bcrypt from "bcrypt";
import db from "../config/database";

export const Listarimagenes = async (request: Request, response: Response) => {
    try {
        const items = await imagenes.findAll();
        response.json({ data: items });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error al listar imagenes" });
    }
};

export const EliminarImagenporId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await imagenes.findOne({ where: { id_usuario: String(id) } });
    if (!item) return response.status(404).json({ error: "Imagen no encontrada" });
    await item.destroy();
    response.json({ data: "Imagen eliminada" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar imagen" });
  }
};

export const ObtenerimagenPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await imagenes.findOne({ where: { id_usuario: String(id) } });
    if (!item) return response.status(404).json({ error: "Imagen no encontrada" });
    const data: any = item.toJSON();
    // Convertimos el buffer a base64 para que sea fácil de consumir desde el frontend
    try {
      const buf: Buffer | null = item.getDataValue('imagenB');
      if (buf) data.imagenBase64 = buf.toString('base64');
    } catch (e) {
      console.error('Error convirtiendo imagen a base64', e.message);
    }

    response.json({ data });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener imagen" });
  }
};

export const añadirimagen = async (request: Request, response: Response) => {
  try {
    // Esperamos un body JSON con { id_usuario, imagenBase64 }
    const { id_usuario, imagenB } = request.body as any;
    if (!imagenB) return response.status(400).json({ error: 'Se requiere imagenBase64 en el body' });

    // Validar usuario si se pasó id_usuario
    if (id_usuario) {
      const usu = await usuario.findByPk(Number(id_usuario));
      if (!usu) return response.status(400).json({ error: 'id_usuario inválido' });
    }

    // Si imagenBase64 viene con data URI, eliminar el prefijo
    const matches = String(imagenB).match(/^data:([a-zA-Z0-9+/.-]+);base64,(.*)$/);
    const b64 = matches ? matches[2] : imagenB;

    const buffer = Buffer.from(b64, 'base64');

    const nuevo = await imagenes.create({ id_usuario: id_usuario ?? null, imagenB: buffer });
    const plain = nuevo.toJSON() as any;
    plain.imagenBase64 = b64; // devolvemos la base64 (sin prefijo)

    response.status(201).json({ data: plain });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear imagen" });
  }
};