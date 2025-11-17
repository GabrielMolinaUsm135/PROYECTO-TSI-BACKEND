import { Request, Response } from "express";
import Notas from "../models/notas";

export const ListarNotas = async (request: Request, response: Response) => {
  try {
    const items = await Notas.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar notas" });
  }
};

export const ObtenerNotaPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Notas.findByPk(id);
    if (!item) return response.status(404).json({ error: "Nota no encontrada" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener nota" });
  }
};

export const CrearNota = async (request: Request, response: Response) => {
  try {
    const nuevo = await Notas.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear nota" });
  }
};

export const ActualizarNotaPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Notas.findByPk(id);
    if (!item) return response.status(404).json({ error: "Nota no encontrada" });
    await item.update(request.body);
    await item.save();
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al actualizar nota" });
  }
};

export const EliminarNotaPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Notas.findByPk(id);
    if (!item) return response.status(404).json({ error: "Nota no encontrada" });
    await item.destroy();
    response.json({ data: "Nota eliminada" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar nota" });
  }
};

export default {};
