import { Request, Response } from "express";
import imagenes_insumos from "../models/imagenesins";
import Insumo from "../models/insumo";
import Rol from "../models/rol";
import bcrypt from "bcrypt";
import db from "../config/database";

export const ListarimagenesIns = async (request: Request, response: Response) => {
    try {
        const items = await imagenes_insumos.findAll();
        response.json({ data: items });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error al listar imagenes" });
    }
};

export const EliminarImagenInsPorId = async (request: Request, response: Response) => {
  const { cod_insumo } = request.params;
  try {
    // Buscar por la columna cod_insumo (no por PK id_image)
    const item = await imagenes_insumos.findOne({ where: { cod_insumo: String(cod_insumo) } });
    if (!item) return response.status(404).json({ error: `Imagen no encontrada para cod_insumo ${cod_insumo}` });
    await item.destroy();
    response.json({ data: `Imagen eliminada para cod_insumo ${cod_insumo}` });
  } catch (error) {
    console.error('Error eliminando imagen insumo:', error instanceof Error ? error.message : String(error));
    response.status(500).json({ error: "Error al eliminar imagen" });
  }
};

export const ObtenerimagenInsPorCod = async (request: Request, response: Response) => {
  const { cod_insumo } = request.params;
  try {
    // Buscar por la columna cod_insumo (no por PK id_image)
    const item = await imagenes_insumos.findOne({ where: { cod_insumo: String(cod_insumo) } });
    if (!item) return response.status(404).json({ error: `Imagen no encontrada para cod_insumo ${cod_insumo}` });
    const data: any = item.toJSON();
    // Convertimos el buffer a base64 para que sea fácil de consumir desde el frontend
    try {
      const buf: Buffer | null = item.getDataValue('imagenIns');
      if (buf) data.imagenBase64 = buf.toString('base64');
    } catch (er) {
      console.error('Error convirtiendo imagen a base64', er instanceof Error ? er.message : String(er));
    }

    response.json({ data });
  } catch (error) {
    console.error('Error obteniendo imagen insumo:', error instanceof Error ? error.message : String(error));
    response.status(500).json({ error: "Error al obtener imagen" });
  }
};

export const añadirimagenIns = async (request: Request, response: Response) => {
  try {
    // Esperamos un body JSON con { id_usuario, imagenBase64 }
    const { cod_insumo, imagenIns } = request.body as any;
    if (!imagenIns) return response.status(400).json({ error: 'Se requiere imagenBase64 en el body' });

    // Validar usuario si se pasó id_usuario
    if (cod_insumo) {
      // En la tabla `insumo` la PK `cod_insumo` es una cadena. No convertir a Number aquí.
      const usu = await Insumo.findByPk(String(cod_insumo));
      if (!usu) return response.status(400).json({ error: 'cod_insumo inválido' });
      // Si ya existe una imagen para ese insumo, evitar duplicados (campo unique en el modelo)
      const existenteImg = await imagenes_insumos.findOne({ where: { cod_insumo: String(cod_insumo) } });
      if (existenteImg) return response.status(409).json({ error: 'Ya existe una imagen para el cod_insumo indicado' });
    }

    // Si imagenBase64 viene con data URI, eliminar el prefijo
    const matches = String(imagenIns).match(/^data:([a-zA-Z0-9+/.-]+);base64,(.*)$/);
    const b64 = matches ? matches[2] : imagenIns;

    const buffer = Buffer.from(b64, 'base64');

    const nuevo = await imagenes_insumos.create({ cod_insumo: cod_insumo ?? null, imagenIns: buffer });
    const plain = nuevo.toJSON() as any;
    plain.imagenBase64 = b64; // devolvemos la base64 (sin prefijo)

    response.status(201).json({ data: plain });
  } catch (error) {
    console.error('Error creando imagen insumo:', error instanceof Error ? error.message : String(error));
    response.status(500).json({ error: "Error al crear imagen" });
  }
};