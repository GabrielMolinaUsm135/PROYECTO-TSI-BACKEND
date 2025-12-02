import { Request, Response } from "express";
import InstrumentoInsumo from "../models/instrumento_insumo";

export const ListarInstrumentoInsumo = async (request: Request, response: Response) => {
  try {
    const items = await InstrumentoInsumo.findAll();
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar instrumento_insumo" });
  }
};

export const ListarInstrumentoInsumoPorInstrumento = async (request: Request, response: Response) => {
  const { cod_instrumento } = request.params;
  try {
    const items = await InstrumentoInsumo.findAll({ where: { cod_instrumento } });
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar registros por instrumento" });
  }
};

export const ListarInstrumentoInsumoPorInsumo = async (request: Request, response: Response) => {
  const { cod_insumo } = request.params;
  try {
    const items = await InstrumentoInsumo.findAll({ where: { cod_insumo } });
    response.json({ data: items });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar registros por insumo" });
  }
};

export const ObtenerInstrumentoInsumo = async (request: Request, response: Response) => {
  const { cod_instrumento, cod_insumo } = request.params;
  try {
    const item = await InstrumentoInsumo.findOne({ where: { cod_instrumento, cod_insumo } });
    if (!item) return response.status(404).json({ error: "Registro no encontrado" });
    response.json({ data: item });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener registro" });
  }
};

export const CrearInstrumentoInsumo = async (request: Request, response: Response) => {
  try {
    const nuevo = await InstrumentoInsumo.create(request.body);
    response.status(201).json({ data: nuevo });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al crear registro" });
  }
};

export const EliminarInstrumentoInsumo = async (request: Request, response: Response) => {
  const { cod_instrumento, cod_insumo } = request.params;
  try {
    const item = await InstrumentoInsumo.findOne({ where: { cod_instrumento, cod_insumo } });
    if (!item) return response.status(404).json({ error: "Registro no encontrado" });
    await item.destroy();
    response.json({ data: "Registro eliminado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al eliminar registro" });
  }
};

export default {};
