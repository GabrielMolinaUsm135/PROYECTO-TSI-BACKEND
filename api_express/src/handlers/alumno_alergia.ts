import { Request, Response } from "express";
import AlumnoAlergia from "../models/alumno_alergia";
import Alergia from "../models/alergia";

export const ListarAlumnoAlergia = async (request: Request, response: Response) => {
  try {
    const items = await AlumnoAlergia.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar alumno_alergia" });
  }
};

export const ObtenerAlumnoAlergia = async (request: Request, response: Response) => {
  const { cod_alergia, id_alumno } = request.params;
  try {
    const item = await AlumnoAlergia.findOne({ where: { cod_alergia, id_alumno } });
    if (!item) return response.status(404).json({ error: "Registro no encontrado" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener registro" });
  }
};

export const CrearAlumnoAlergia = async (request: Request, response: Response) => {
  try {
    const nuevo = await AlumnoAlergia.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear registro" });
  }
};

export const EliminarAlumnoAlergia = async (request: Request, response: Response) => {
  const { cod_alergia, id_alumno } = request.params;
  try {
    const item = await AlumnoAlergia.findOne({ where: { cod_alergia, id_alumno } });
    if (!item) return response.status(404).json({ error: "Registro no encontrado" });
    await item.destroy();
    response.json({ data: "Registro eliminado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar registro" });
  }
};

export const ListarAlergiasPorAlumno = async (request: Request, response: Response) => {
  const { id_alumno } = request.params;
  try {
    const items = await AlumnoAlergia.findAll({ where: { id_alumno }, include: [Alergia] });
    const alergias = items.map(i => i.alergia).filter(Boolean);
    response.json({ data: alergias });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar alergias del alumno" });
  }
};

export default {};
