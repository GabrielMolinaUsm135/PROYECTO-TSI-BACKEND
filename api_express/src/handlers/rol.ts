import { Request, Response } from "express";
import Rol from "../models/rol";

export const ListarRoles = async (request: Request, response: Response) => {
  try {
    const roles = await Rol.findAll();
    response.json({ data: roles });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar roles" });
  }
};

export const ObtenerRolPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const rol = await Rol.findByPk(id);
    if (!rol) return response.status(404).json({ error: "Rol no encontrado" });
    response.json({ data: rol });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener rol" });
  }
};

export const CrearRol = async (request: Request, response: Response) => {
  try {
    const nuevo = await Rol.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear rol" });
  }
};

export const ActualizarRolPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const rol = await Rol.findByPk(id);
    if (!rol) return response.status(404).json({ error: "Rol no encontrado" });
    await rol.update(request.body);
    await rol.save();
    response.json({ data: rol });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al actualizar rol" });
  }
};

export const EliminarRolPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const rol = await Rol.findByPk(id);
    if (!rol) return response.status(404).json({ error: "Rol no encontrado" });
    await rol.destroy();
    response.json({ data: "Rol eliminado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar rol" });
  }
};

export default {};
