import { Request, Response } from "express";
import Profesor from "../models/profesor";
import usuario from "../models/usuario";
import Rol from "../models/rol";
import bcrypt from "bcrypt";
import db from "../config/database";

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
  // Create usuario and profesor atomically if user data is provided
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    telefono,
    direccion,
    asignatura,
    // optional user fields
    correo,
    password,
    id_rol,
    tipo_usuario
  } = request.body;

  const transaction = await db.transaction();
  try {
    let id_usuario: number | null = null;

    if (correo && password) {
      const existente = await usuario.findOne({ where: { correo }, transaction });
      if (existente) {
        await transaction.rollback();
        return response.status(409).json({ error: "El usuario ya existe" });
      }

      // determine role id
      let roleId: number | null = null;
      if (id_rol !== undefined && id_rol !== null) {
        roleId = Number(id_rol);
      } else if (tipo_usuario !== undefined && !isNaN(Number(tipo_usuario))) {
        roleId = Number(tipo_usuario);
      }

      if (roleId) {
        const rolExist = await Rol.findByPk(roleId);
        if (!rolExist) {
          await transaction.rollback();
          return response.status(400).json({ error: "id_rol no válido" });
        }
      }

      const hashed = await bcrypt.hash(password, 10);
      const nuevoUser = await usuario.create({ correo, password: hashed, id_rol: roleId }, { transaction });
      id_usuario = nuevoUser.getDataValue('id_usuario');
    }

    const profesorData: any = {
      id_usuario: id_usuario,
      nombre: nombre ?? null,
      apellido_paterno: apellido_paterno ?? null,
      apellido_materno: apellido_materno ?? null,
      telefono: telefono ?? null,
      direccion: direccion ?? null,
      asignatura: asignatura ?? null,
    };

    const nuevo = await Profesor.create(profesorData, { transaction });
    await transaction.commit();
    response.status(201).json({ data: nuevo });
  } catch (error) {
    await transaction.rollback();
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
