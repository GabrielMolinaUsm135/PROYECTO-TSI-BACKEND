import { Request, Response } from "express";
import { Op } from "sequelize";
import GrupoTeoria from "../models/grupo_teoria";

export const ListarGrupos = async (request: Request, response: Response) => {
  try {
    const items = await GrupoTeoria.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar grupos" });
  }
};

export const ObtenerGrupoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await GrupoTeoria.findByPk(id);
    if (!item) return response.status(404).json({ error: "Grupo no encontrado" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener grupo" });
  }
};

export const CrearGrupo = async (request: Request, response: Response) => {
  try {
    const nuevo = await GrupoTeoria.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear grupo" });
  }
};

export const ActualizarGrupoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await GrupoTeoria.findByPk(id);
    if (!item) return response.status(404).json({ error: "Grupo no encontrado" });
    await item.update(request.body);
    await item.save();
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al actualizar grupo" });
  }
};

export const EliminarGrupoPorId = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const item = await GrupoTeoria.findByPk(id);
    if (!item) return response.status(404).json({ error: "Grupo no encontrado" });
    await item.destroy();
    response.json({ data: "Grupo eliminado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar grupo" });
  }
};

export const ObtenerGrupoPorNombre = async (request: Request, response: Response) => {
  const { nombre } = request.params;
  try {
    // Exact match on the DB column `nombre_grupo` to avoid dialect-specific operators (e.g. ILIKE)
    const items = await GrupoTeoria.findAll({ where: { nombre_grupo: nombre } });
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al buscar grupo por nombre" });
  }
};

export default {};
