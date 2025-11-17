import { Request, Response } from "express";
import Profesor from "../models/profesor";

export const ListarProfesores = async (request: Request, response: Response) => {
  try {
    const items = await Profesor.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar profesores" });
  }
};

export const ObtenerProfesorPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Profesor.findByPk(id);
    if (!item) return response.status(404).json({ error: "Profesor no encontrado" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener profesor" });
  }
};

export const CrearProfesor = async (request: Request, response: Response) => {
  try {
    const nuevo = await Profesor.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear profesor" });
  }
};

export const ActualizarProfesorPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Profesor.findByPk(id);
    if (!item) return response.status(404).json({ error: "Profesor no encontrado" });
    await item.update(request.body);
    await item.save();
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al actualizar profesor" });
  }
};

export const EliminarProfesorPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await Profesor.findByPk(id);
    if (!item) return response.status(404).json({ error: "Profesor no encontrado" });
    await item.destroy();
    response.json({ data: "Profesor eliminado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar profesor" });
  }
};

export default {};
