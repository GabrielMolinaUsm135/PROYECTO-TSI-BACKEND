import { Request, Response } from "express";
import Insumo from "../models/insumo";

export const ListarInsumos = async (request: Request, response: Response) => {
  try {
    const items = await Insumo.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar insumos" });
  }
};

export const ObtenerInsumoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Insumo.findByPk(id);
    if (!item) return response.status(404).json({ error: "Insumo no encontrado" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener insumo" });
  }
};

export const CrearInsumo = async (request: Request, response: Response) => {
  try {
    const nuevo = await Insumo.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear insumo" });
  }
};

export const ActualizarInsumoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Insumo.findByPk(id);
    if (!item) return response.status(404).json({ error: "Insumo no encontrado" });
    await item.update(request.body);
    await item.save();
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al actualizar insumo" });
  }
};

export const EliminarInsumoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Insumo.findByPk(id);
    if (!item) return response.status(404).json({ error: "Insumo no encontrado" });
    await item.destroy();
    response.json({ data: "Insumo eliminado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar insumo" });
  }
};

export default {};
