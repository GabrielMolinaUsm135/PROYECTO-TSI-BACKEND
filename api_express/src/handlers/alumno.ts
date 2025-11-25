import { Request, Response } from "express";
import Alumno from "../models/alumno";
import usuario from "../models/usuario";
import Rol from "../models/rol";
import bcrypt from "bcrypt";
import db from "../config/database";

//retorna un mensaje de ejemplo
export const ListarAlumnos = async (request: Request, response: Response) => {
    // response.send('placeholder');
    try {
        const alumnos = await Alumno.findAll();

        response.json({ data: alumnos });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al listar alumnos ' + error.message });
    }
};

export const ObtenerAlumnoPorRut = async (request: Request, response: Response) => {
    const { rut } = request.params
    // response.json('Alumno por Rut: ' + rut)

    try {
        const alumno = await Alumno.findOne({ where: { rut } });
        if (!alumno) return response.status(404).json({ error: 'Alumno no encontrado' });
        response.json({ data: alumno });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al obtener alumno por RUT' });
    }
};

export const ObtenerAlumnoPorNombre = async (request: Request, response: Response) => {
    const { nombre } = request.params;
    
    try {
        const alumnos = await Alumno.findAll({
            where: {
                nombre: nombre,
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
                nombre: nombre,
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
                nombre: nombre,
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
    // Create a user and the alumno in a transaction if user data is provided
    const {
        // alumno fields
        id_apoderado,
        id_grupo_teoria,
        fecha_ingreso,
        nombre,
        apellido_paterno,
        apellido_materno,
        telefono,
        direccion,
        diagnostico_ne,
        // optional user fields
        correo,
        password,
        id_rol,
        tipo_usuario,
        // rut (now accepted and stored as a normal column)
        rut
    } = request.body;

    const transaction = await db.transaction();
    try {
        let id_usuario: number | null = null;

        // if user data provided, create user first
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

        const alumnoData: any = {
            id_apoderado: id_apoderado ?? null,
            id_usuario: id_usuario,
            rut: rut ?? null,
            nombre: nombre ?? null,
            apellido_paterno: apellido_paterno ?? null,
            apellido_materno: apellido_materno ?? null,
            telefono: telefono ?? null,
            direccion: direccion ?? null,
            diagnostico_ne: diagnostico_ne ?? null,
            id_grupo_teoria: id_grupo_teoria ?? null,
            fecha_ingreso: fecha_ingreso ?? null,
        };

        const nuevoAlumno = await Alumno.create(alumnoData, { transaction });
        await transaction.commit();

        response.status(201).json({ data: nuevoAlumno });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        response.status(500).json({ error: 'Error al crear alumno' });
    }
};

export const ActualizarAlumnoPorRut = async (request: Request, response: Response) => {
    // response.send('placeholder');
    const {rut} = request.params
    try {
        const alumno = await Alumno.findOne({ where: { rut } });
        if (!alumno) return response.status(404).json({ error: 'Alumno no encontrado' });
        await alumno.update(request.body);
        await alumno.save();
        response.json({ data: alumno });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al actualizar alumno' });
    }
};

export const EliminarAlumnoPorRut = async (request: Request, response: Response) => {
    const { rut } = request.params;
    const transaction = await db.transaction();
    try {
        const alumno = await Alumno.findOne({ where: { rut }, transaction });
        if (!alumno) {
            await transaction.rollback();
            return response.status(404).json({ error: 'Alumno no encontrado' });
        }

        const id_usuario = alumno.getDataValue('id_usuario');

        await alumno.destroy({ transaction });

        let usuarioEliminado = false;
        if (id_usuario) {
            const usu = await usuario.findByPk(id_usuario, { transaction });
            if (usu) {
                await usu.destroy({ transaction });
                usuarioEliminado = true;
            }
        }

        await transaction.commit();
        response.json({ data: `Alumno eliminado${usuarioEliminado ? ' y usuario asociado eliminado' : ''}` });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        response.status(500).json({ error: 'Error al eliminar alumno' });
    }
};

export const EliminarAlumnoPorId = async (request: Request, response: Response) => {
    const { id } = request.params;
    const transaction = await db.transaction();
    try {
        const alumno = await Alumno.findByPk(id, { transaction });
        if (!alumno) {
            await transaction.rollback();
            return response.status(404).json({ error: 'Alumno no encontrado' });
        }

        const id_usuario = alumno.getDataValue('id_usuario');

        await alumno.destroy({ transaction });

        let usuarioEliminado = false;
        if (id_usuario) {
            const usu = await usuario.findByPk(id_usuario, { transaction });
            if (usu) {
                await usu.destroy({ transaction });
                usuarioEliminado = true;
            }
        }

        await transaction.commit();
        response.json({ data: `Alumno eliminado${usuarioEliminado ? ' y usuario asociado eliminado' : ''}` });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        response.status(500).json({ error: 'Error al eliminar alumno por id' });
    }
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