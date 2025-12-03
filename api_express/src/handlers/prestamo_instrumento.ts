import { Request, Response } from "express";
import PrestamoInstrumento from "../models/prestamo_instrumento";
import PrestamoInsumo from "../models/prestamo_insumo";
import Instrumento from "../models/instrumento";
import Insumo from "../models/insumo";

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

export const ListarCodigosPrestamosInstrumento = async (request: Request, response: Response) => {
  try {
    const items = await PrestamoInstrumento.findAll({ attributes: ["cod_prestamo"], raw: true });
    const codigos = items.map((i: any) => i.cod_prestamo);
    response.json({ data: codigos });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar codigos de prestamos instrumento" });
  }
};

export const ListarCodigosPrestamos = async (request: Request, response: Response) => {
  try {
    const instr = await PrestamoInstrumento.findAll({ attributes: ["cod_prestamo"], raw: true });
    const insu = await PrestamoInsumo.findAll({ attributes: ["cod_prestamo"], raw: true });
    const prestamos_instrumento = instr.map((i: any) => i.cod_prestamo);
    const prestamos_insumo = insu.map((i: any) => i.cod_prestamo);
    response.json({ data: { prestamos_instrumento, prestamos_insumo } });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar codigos de prestamos" });
  }
};

export const InstrumentoEstaEnUso = async (request: Request, response: Response) => {
  const { cod_instrumento } = request.params;
  try {
    const pendientes = await PrestamoInstrumento.count({ where: { cod_instrumento, estado: "pendiente" } });
    const enUso = pendientes > 0;
    response.json({ data: { cod_instrumento, enUso, pendientes } });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al verificar estado de uso del instrumento" });
  }
};

export const ListarPrestamosPorUsuario = async (request: Request, response: Response) => {
  const { id_usuario } = request.params;
  try {
    const prestamosInstrumento = await PrestamoInstrumento.findAll({ where: { id_usuario }, include: [Instrumento] });
    const prestamosInsumo = await PrestamoInsumo.findAll({ where: { id_usuario }, include: [Insumo] });

    response.json({ data: { prestamos_instrumento: prestamosInstrumento, prestamos_insumo: prestamosInsumo } });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar prestamos por usuario" });
  }
};

export default {};
