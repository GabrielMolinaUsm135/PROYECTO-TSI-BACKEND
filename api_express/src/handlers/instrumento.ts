import { Request, Response } from "express";
import Instrumento from "../models/instrumento";

export const ListarInstrumentos = async (request: Request, response: Response) => {
  try {
    const items = await Instrumento.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar instrumentos" });
  }
};

export const ObtenerInstrumentoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Instrumento.findByPk(id);
    if (!item) return response.status(404).json({ error: "Instrumento no encontrado" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener instrumento" });
  }
};

export const CrearInstrumento = async (request: Request, response: Response) => {
  try {
    const nuevo = await Instrumento.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear instrumento" });
  }
};

export const ActualizarInstrumentoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Instrumento.findByPk(id);
    if (!item) return response.status(404).json({ error: "Instrumento no encontrado" });
    await item.update(request.body);
    await item.save();
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al actualizar instrumento" });
  }
};

export const EliminarInstrumentoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Instrumento.findByPk(id);
    if (!item) return response.status(404).json({ error: "Instrumento no encontrado" });
    await item.destroy();
    response.json({ data: "Instrumento eliminado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar instrumento" });
  }
};

export default {};
