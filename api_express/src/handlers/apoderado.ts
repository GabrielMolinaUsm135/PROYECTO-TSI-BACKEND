import { Request, Response } from "express";
import Apoderado from "../models/apoderado";
import Alumno from "../models/alumno";

export const ListarApoderados = async (request: Request, response: Response) => {
  try {
    const items = await Apoderado.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar apoderados " + error.mensagge });
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

export const ListarRutApoderados = async (request: Request, response: Response) => {
  try {
    const items = await Apoderado.findAll({ attributes: ["rut"], raw: true });
    const ruts = items.map((i: any) => i.rut);
    response.json({ data: ruts });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar ruts de apoderados" });
  }
};

export const ObtenerApoderadoPorRut = async (request: Request, response: Response) => {
  const { rut } = request.params;
  try {
    const item = await Apoderado.findOne({ where: { rut } });
    if (!item) return response.status(404).json({ error: "Apoderado no encontrado" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener apoderado por rut" });
  }
};

export const ApoderadoTieneHijo = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const apoderado = await Apoderado.findByPk(id);
    if (!apoderado) return response.status(404).json({ error: "Apoderado no encontrado" });

    const count = await Alumno.count({ where: { id_apoderado: id } });
    response.json({ hasKid: count > 0, count });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al verificar si apoderado tiene hijos" });
  }
};

export const ListarAlumnosPorApoderado = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const apoderado = await Apoderado.findByPk(id);
    if (!apoderado) return response.status(404).json({ error: "Apoderado no encontrado" });

    const alumnos = await Alumno.findAll({ where: { id_apoderado: id } });
    response.json({ data: alumnos });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar alumnos del apoderado" });
  }
};

export default {};
