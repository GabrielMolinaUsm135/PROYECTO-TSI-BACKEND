import { Request, Response } from "express";
import Apoderado from "../models/apoderado";

export const ListarApoderados = async (request: Request, response: Response) => {
  try {
    const items = await Apoderado.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar apoderados" });
  }
};

export const ObtenerApoderadoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Apoderado.findByPk(id);
    if (!item) return response.status(404).json({ error: "Apoderado no encontrado" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener apoderado" });
  }
};

export const CrearApoderado = async (request: Request, response: Response) => {
  try {
    const nuevo = await Apoderado.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear apoderado" });
  }
};

export const ActualizarApoderadoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Apoderado.findByPk(id);
    if (!item) return response.status(404).json({ error: "Apoderado no encontrado" });
    await item.update(request.body);
    await item.save();
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al actualizar apoderado" });
  }
};

export const EliminarApoderadoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Apoderado.findByPk(id);
    if (!item) return response.status(404).json({ error: "Apoderado no encontrado" });
    await item.destroy();
    response.json({ data: "Apoderado eliminado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar apoderado" });
  }
};

export default {};
