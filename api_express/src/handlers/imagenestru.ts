import { Request, Response } from "express";
import imagenes_instrumentos from "../models/imagenestru";
import Instrumento from "../models/instrumento";
import Rol from "../models/rol";
import bcrypt from "bcrypt";
import db from "../config/database";

export const ListarimagenesTru = async (request: Request, response: Response) => {
    try {
        const items = await imagenes_instrumentos.findAll();
        response.json({ data: items });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error al listar imagenes" });
    }
};

export const ObtenerimagenTruPorCod = async (request: Request, response: Response) => {
  const { cod_instrumento } = request.params;
  try {
    // Buscar por la columna cod_insumo (no por PK id_image)
    const item = await imagenes_instrumentos.findOne({ where: { cod_instrumento: String(cod_instrumento) } });
    if (!item) return response.status(404).json({ error: `Imagen no encontrada para cod_instrumento ${cod_instrumento}` });
    const data: any = item.toJSON();
    // Convertimos el buffer a base64 para que sea fácil de consumir desde el frontend
    try {
      const buf: Buffer | null = item.getDataValue('imagentr');
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

export const añadirimagenTru = async (request: Request, response: Response) => {
  try {
    // Esperamos un body JSON con { id_usuario, imagenBase64 }
    const { cod_instrumento, imagentr } = request.body as any;
    if (!imagentr) return response.status(400).json({ error: 'Se requiere imagenBase64 en el body' });

    // Validar usuario si se pasó id_usuario
    if (cod_instrumento) {
      // En la tabla `instrumento` la PK `cod_instrumento` es una cadena. No convertir a Number aquí.
      const usu = await Instrumento.findByPk(String(cod_instrumento));
      if (!usu) return response.status(400).json({ error: 'cod_instrumento inválido' });
      // Si ya existe una imagen para ese instrumento, evitar duplicados (campo unique en el modelo)
      const existenteImg = await imagenes_instrumentos.findOne({ where: { cod_instrumento: String(cod_instrumento) } });
      if (existenteImg) return response.status(409).json({ error: 'Ya existe una imagen para el cod_instrumento indicado' });
    }

    // Si imagenBase64 viene con data URI, eliminar el prefijo
    const matches = String(imagentr).match(/^data:([a-zA-Z0-9+/.-]+);base64,(.*)$/);
    const b64 = matches ? matches[2] : imagentr;

    const buffer = Buffer.from(b64, 'base64');

    const nuevo = await imagenes_instrumentos.create({ cod_instrumento: cod_instrumento ?? null, imagentr: buffer });
    const plain = nuevo.toJSON() as any;
    plain.imagenBase64 = b64; // devolvemos la base64 (sin prefijo)

    response.status(201).json({ data: plain });
  } catch (error) {
    console.error('Error creando imagen insumo:', error instanceof Error ? error.message : String(error));
    response.status(500).json({ error: "Error al crear imagen" });
  }
};