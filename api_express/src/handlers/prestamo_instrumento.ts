import { Request, Response } from "express";
import PrestamoInstrumento from "../models/prestamo_instrumento";

export const ListarPrestamosInstrumento = async (request: Request, response: Response) => {
  try {
    const items = await PrestamoInstrumento.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar prestamos instrumento" });
  }
};

export const ObtenerPrestamoInstrumentoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await PrestamoInstrumento.findByPk(id);
    if (!item) return response.status(404).json({ error: "Préstamo no encontrado" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener préstamo" });
  }
};

export const CrearPrestamoInstrumento = async (request: Request, response: Response) => {
  try {
    const nuevo = await PrestamoInstrumento.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear préstamo" });
  }
};

export const ActualizarPrestamoInstrumentoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await PrestamoInstrumento.findByPk(id);
    if (!item) return response.status(404).json({ error: "Préstamo no encontrado" });
    await item.update(request.body);
    await item.save();
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al actualizar préstamo" });
  }
};

export const EliminarPrestamoInstrumentoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await PrestamoInstrumento.findByPk(id);
    if (!item) return response.status(404).json({ error: "Préstamo no encontrado" });
    await item.destroy();
    response.json({ data: "Préstamo eliminado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar préstamo" });
  }
};

export default {};
