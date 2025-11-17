import { Request, Response } from "express";
import PrestamoInsumo from "../models/prestamo_insumo";

export const ListarPrestamosInsumo = async (request: Request, response: Response) => {
  try {
    const items = await PrestamoInsumo.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar prestamos insumo" });
  }
};

export const ObtenerPrestamoInsumoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await PrestamoInsumo.findByPk(id);
    if (!item) return response.status(404).json({ error: "Préstamo no encontrado" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener préstamo" });
  }
};

export const CrearPrestamoInsumo = async (request: Request, response: Response) => {
  try {
    const nuevo = await PrestamoInsumo.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear préstamo" });
  }
};

export const ActualizarPrestamoInsumoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await PrestamoInsumo.findByPk(id);
    if (!item) return response.status(404).json({ error: "Préstamo no encontrado" });
    await item.update(request.body);
    await item.save();
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al actualizar préstamo" });
  }
};

export const EliminarPrestamoInsumoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await PrestamoInsumo.findByPk(id);
    if (!item) return response.status(404).json({ error: "Préstamo no encontrado" });
    await item.destroy();
    response.json({ data: "Préstamo eliminado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar préstamo" });
  }
};

export default {};
