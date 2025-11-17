import { Request, Response } from "express";
import Alergia from "../models/alergia";

export const ListarAlergias = async (request: Request, response: Response) => {
  try {
    const items = await Alergia.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar alergias" });
  }
};

export const ObtenerAlergiaPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Alergia.findByPk(id);
    if (!item) return response.status(404).json({ error: "Alergia no encontrada" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener alergia" });
  }
};

export const CrearAlergia = async (request: Request, response: Response) => {
  try {
    const nuevo = await Alergia.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear alergia" });
  }
};

export const ActualizarAlergiaPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Alergia.findByPk(id);
    if (!item) return response.status(404).json({ error: "Alergia no encontrada" });
    await item.update(request.body);
    await item.save();
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al actualizar alergia" });
  }
};

export const EliminarAlergiaPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Alergia.findByPk(id);
    if (!item) return response.status(404).json({ error: "Alergia no encontrada" });
    await item.destroy();
    response.json({ data: "Alergia eliminada" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar alergia" });
  }
};

export default {};
