import { Request, Response } from "express";
import Clase from "../models/clase";

export const ListarClases = async (request: Request, response: Response) => {

    try {
        const items = await Clase.findAll();
        response.json({ data: items });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error al listar clases" });
    }
}