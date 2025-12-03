import { Request, Response } from "express";
import InstrumentoInsumo from "../models/instrumento_insumo";
import Insumo from "../models/insumo";
import Instrumento from "../models/instrumento";

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
    const items = await InstrumentoInsumo.findAll({ where: { cod_instrumento }, include: [Insumo] });

    // Fill missing included insumo by manual lookup (fallback)
    const filled = await Promise.all(items.map(async (it: any) => {
      if (!it.insumo || Object.keys(it.insumo).length === 0) {
        const cod = it.getDataValue ? it.getDataValue('cod_insumo') : it.cod_insumo;
        if (cod) {
          const ins = await Insumo.findByPk(cod);
          it.insumo = ins || null;
        }
      }
      return it;
    }));

    response.json({ data: filled });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar registros por instrumento" });
  }
};

export const ListarInstrumentoInsumoPorInsumo = async (request: Request, response: Response) => {
  const { cod_insumo } = request.params;
  try {
    const items = await InstrumentoInsumo.findAll({ where: { cod_insumo }, include: [Instrumento] });

    // Fill missing included instrumento by manual lookup (fallback)
    const filled = await Promise.all(items.map(async (it: any) => {
      if (!it.instrumento || Object.keys(it.instrumento).length === 0) {
        const cod = it.getDataValue ? it.getDataValue('cod_instrumento') : it.cod_instrumento;
        if (cod) {
          const instr = await Instrumento.findByPk(cod);
          it.instrumento = instr || null;
        }
      }
      return it;
    }));

    response.json({ data: filled });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar registros por insumo" });
  }
};

export const ListarInsumosConInstrumento = async (request: Request, response: Response) => {
  try {
    // get distinct cod_insumo from join table
    const rows: any[] = await InstrumentoInsumo.findAll({ attributes: ["cod_insumo"], raw: true });
    const cods = Array.from(new Set(rows.map(r => r.cod_insumo))).filter(Boolean);
    if (cods.length === 0) return response.json({ data: [] });

    const insumos = await Insumo.findAll({ where: { cod_insumo: cods } });
    response.json({ data: insumos });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar insumos que pertenecen a un instrumento" });
  }
};

export const ListarCodigosInsumosConInstrumento = async (request: Request, response: Response) => {
  try {
    const rows: any[] = await InstrumentoInsumo.findAll({ attributes: ["cod_insumo"], raw: true });
    const cods = Array.from(new Set(rows.map(r => r.cod_insumo))).filter(Boolean);
    response.json({ data: cods });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al listar codigos de insumos que pertenecen a un instrumento" });
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
