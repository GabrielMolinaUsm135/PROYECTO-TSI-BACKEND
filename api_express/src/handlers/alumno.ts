import { Request, Response } from "express";
import Alumno from "../models/alumno";

//retorna un mensaje de ejemplo
export const ListarAlumnos = async (request: Request, response: Response) => {
    // response.send('placeholder');
    try {
        const alumnos = await Alumno.findAll();

        response.json({ data: alumnos });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al listar alumnos' });
    }
};

export const ObtenerAlumnoPorRut = async (request: Request, response: Response) => {
    const { rut } = request.params
    // response.json('Alumno por Rut: ' + rut)

    const alumno = await Alumno.findByPk(rut)
    response.json({data:alumno})
};

export const ObtenerAlumnoPorNombre = async (request: Request, response: Response) => {
    const { nombre } = request.params;
    
    try {
        const alumnos = await Alumno.findAll({
            where: {
                nombre_alumno: nombre,
            }
        });
        
        response.json({ data: alumnos });
    } catch (error) {
        response.status(500).json({ 
            message: 'Error al buscar alumnos',
            error 
        });
    }
};

export const ObtenerAlumnoPorNombreApellido = async (request: Request, response: Response) => {
    const { nombre, apellido } = request.params;
    
    try {
        const alumnos = await Alumno.findAll({
            where: {
                nombre_alumno: nombre,
                apellido_paterno: apellido
            }
        });
        
        response.json({ data: alumnos });
    } catch (error) {
        response.status(500).json({ 
            message: 'Error al buscar alumnos',
            error 
        });
    }
};

// ObtenerAlumnoPorApellidoP

export const ObtenerAlumnoPorApellidoP = async (request: Request, response: Response) => {
    const { apellidoP } = request.params;
    
    try {
        const alumnos = await Alumno.findAll({
            where: {
                apellido_paterno: apellidoP,
            }
        });
        
        response.json({ data: alumnos });
    } catch (error) {
        response.status(500).json({ 
            message: 'Error al buscar alumnos',
            error 
        });
    }
};

export const ObtenerAlumnoPorNombreApellidoPM = async (request: Request, response: Response) => {
    const { nombre, apellidoP, apellidoM } = request.params;
    
    try {
        const alumnos = await Alumno.findAll({
            where: {
                nombre_alumno: nombre,
                apellido_paterno: apellidoP,
                apellido_materno: apellidoM
            }
        });
        
        response.json({ data: alumnos });
    } catch (error) {
        response.status(500).json({ 
            message: 'Error al buscar alumnos',
            error 
        });
    }
};

export const CrearAlumno = async (request: Request, response: Response) => {
    // response.send('placeholder');
    const alumnoNew = await Alumno.create(request.body)
    response.json({data:alumnoNew})
};

export const ActualizarAlumnoPorRut = async (request: Request, response: Response) => {
    // response.send('placeholder');
    const {rut} = request.params
    const alumno = await Alumno.findByPk(rut)
    await alumno.update(request.body)
    await alumno.save()
    response.json({data:alumno})
};

export const EliminarAlumnoPorRut = async (request: Request, response: Response) => {
        // response.send('placeholder');
    const {rut} = request.params
    const alumno = await Alumno.findByPk(rut)
    await alumno.destroy()
    response.json({data:'Alumno eliminado'})
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