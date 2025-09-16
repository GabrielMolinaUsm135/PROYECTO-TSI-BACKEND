import { Request, Response } from "express";

//retorna un mensaje de ejemplo
export const ListarAlumnos = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const ObtenerAlumnoPorRut = async (request: Request, response: Response) => {
    const { rut } = request.params
    response.json('Alumno por Rut: ' + rut)
};

export const CrearAlumno = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const ActualizarAlumnoPorRut = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const EliminarAlumnoPorRut = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const ObtenerApoderadoDeAlumno = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const ObtenerClasesDeAlumno = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const ObtenerInstrumentosDeAlumno = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const ObtenerNotasDeAlumno = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const CrearNotaParaAlumno = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const ActualizarNotaPorRutYFecha = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const EliminarNotaPorRutYFecha = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const ListarPrestamos = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const ObtenerPrestamoPorId = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const CrearPrestamoInstrumentos = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const DevolverInstrumentoPorIdPrestamo = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const CrearPrestamoInsumos = async (request: Request, response: Response) => {
    response.send('placeholder');
};

export const DevolverInsumoPorIdPrestamo = async (request: Request, response: Response) => {
    response.send('placeholder');
};