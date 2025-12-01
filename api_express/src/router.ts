import { Router } from "express";
import { ejemploHandler, ejemploHandlerById } from "./handlers/ejemplo";
import {
    ListarAlumnos,
    ObtenerAlumnoPorRut,
    CrearAlumno,
    ActualizarAlumnoPorRut,
    EliminarAlumnoPorRut,
    EliminarAlumnoPorId,
    ObtenerAlumnoPorNombre,
    ObtenerAlumnoPorNombreApellido,
    ObtenerAlumnoPorNombreApellidoPM,
    ObtenerAlumnoPorApellidoP
} from "./handlers/alumno";
import { crearUsuario, ListarUsuarios, login } from "./handlers/usuarios";
import { VerificarToken } from "./middleware/verificar";
import {
    ListarRoles,
    ObtenerRolPorId,
    CrearRol,
    ActualizarRolPorId,
    EliminarRolPorId
} from "./handlers/rol";
import {
    ListarApoderados,
    ObtenerApoderadoPorId,
    CrearApoderado,
    ActualizarApoderadoPorId,
    EliminarApoderadoPorId
} from "./handlers/apoderado";
import {
    ListarProfesores,
    ObtenerProfesorPorId,
    CrearProfesor,
    ActualizarProfesorPorId,
    EliminarProfesorPorId
} from "./handlers/profesor";
import {
    ListarNotas,
    ObtenerNotaPorId,
    CrearNota,
    ActualizarNotaPorId,
    EliminarNotaPorId,
    ObtenerNotasPorId
} from "./handlers/notas";
import {
    ListarAlergias,
    ObtenerAlergiaPorId,
    CrearAlergia,
    ActualizarAlergiaPorId,
    EliminarAlergiaPorId
} from "./handlers/alergia";
import {
    ListarGrupos,
    ObtenerGrupoPorId,
    CrearGrupo,
    ActualizarGrupoPorId,
    EliminarGrupoPorId
} from "./handlers/grupo_teoria";
import {
    ListarInstrumentos,
    ObtenerInstrumentoPorId,
    CrearInstrumento,
    ActualizarInstrumentoPorId,
    EliminarInstrumentoPorId
} from "./handlers/instrumento";
import {
    ListarInsumos,
    ObtenerInsumoPorId,
    CrearInsumo,
    ActualizarInsumoPorId,
    EliminarInsumoPorId
} from "./handlers/insumo";
import {
    ListarInstrumentoInsumo,
    ObtenerInstrumentoInsumo,
    CrearInstrumentoInsumo,
    EliminarInstrumentoInsumo
} from "./handlers/instrumento_insumo";
import {
    ListarPrestamosInstrumento,
    ObtenerPrestamoInstrumentoPorId,
    CrearPrestamoInstrumento,
    ActualizarPrestamoInstrumentoPorId,
    EliminarPrestamoInstrumentoPorId
} from "./handlers/prestamo_instrumento";
import {
    ListarPrestamosInsumo,
    ObtenerPrestamoInsumoPorId,
    CrearPrestamoInsumo,
    ActualizarPrestamoInsumoPorId,
    EliminarPrestamoInsumoPorId
} from "./handlers/prestamo_insumo";
import {
    ListarAlumnoAlergia,
    ObtenerAlumnoAlergia,
    CrearAlumnoAlergia,
    EliminarAlumnoAlergia
} from "./handlers/alumno_alergia";
import { ListarClases } from "./handlers/clase";

const router = Router()

//Login :D

router.post('/login', login) //login usuario
router.post('/user/crear', crearUsuario) //registro usuario
router.get('/usuarios', ListarUsuarios); //listar usuarios


//MiddLeware 
//router.use(VerificarToken)
//endpoints
    //cada vez que se invoque la ruta /ruta se debe ejecutar el ejemploHandler
    //localhost:3000/api/ruta
router.get('/ruta', ejemploHandler)
    //ruta para usar con id
    //localhost:3000/api/ruta/1
router.get('/ruta/:id', ejemploHandlerById) //siempre dejar los endpoints con id al final

//alumno
router.get('/lista/alumnos', ListarAlumnos) //listar alumnos
router.get('/alumno/:rut', ObtenerAlumnoPorRut) //obtener un alumno por rut
router.get('/alumno/buscar/n/:nombre', ObtenerAlumnoPorNombre)
router.get('/alumno/buscar/n-aP/:nombre/:apellido', ObtenerAlumnoPorNombreApellido) //obtener alumno por nombre y apellido paterno
router.get('/alumno/buscar/n-aP-aM/:nombre/:apellidoP/:apellidoM', ObtenerAlumnoPorNombreApellidoPM) //obtener alumno por nombre y apellido paterno y materno
router.get('/alumno/buscar/aP/:apellidoP', ObtenerAlumnoPorApellidoP) //obtener alumno por apellido paterno

router.post('/alumno', CrearAlumno) //crear un alumno
router.put('/alumno/:rut', ActualizarAlumnoPorRut) //actualizar un alumno por rut
router.delete('/alumno/:rut', EliminarAlumnoPorRut) //eliminar un alumno por rut
router.delete('/alumno/id/:id', EliminarAlumnoPorId) //eliminar alumno por id_alumno

// Roles
router.get('/roles', ListarRoles)
router.get('/roles/:id', ObtenerRolPorId)
router.post('/roles', CrearRol)
router.put('/roles/:id', ActualizarRolPorId)
router.delete('/roles/:id', EliminarRolPorId)

// Apoderados
router.get('/apoderados', ListarApoderados)
router.get('/apoderados/:id', ObtenerApoderadoPorId)
router.post('/apoderados', CrearApoderado)
router.put('/apoderados/:id', ActualizarApoderadoPorId)
router.delete('/apoderados/:id', EliminarApoderadoPorId)

// Profesores
router.get('/profesores', ListarProfesores)
router.get('/profesores/:id', ObtenerProfesorPorId)
router.post('/profesores', CrearProfesor)
router.put('/profesores/:id', ActualizarProfesorPorId)
router.delete('/profesores/:id', EliminarProfesorPorId)
router.get('/clases',ListarClases)

// Notas
router.get('/notas', ListarNotas)
router.get('/notas/:id', ObtenerNotaPorId)
router.post('/notas', CrearNota)
router.put('/notas/:id', ActualizarNotaPorId)
router.delete('/notas/:id', EliminarNotaPorId)
router.get('/Tnotas/:id', ObtenerNotasPorId) // Obtener todas las notas de un alumno por su id_alumno

// Alergias
router.get('/alergias', ListarAlergias)
router.get('/alergias/:id', ObtenerAlergiaPorId)
router.post('/alergias', CrearAlergia)
router.put('/alergias/:id', ActualizarAlergiaPorId)
router.delete('/alergias/:id', EliminarAlergiaPorId)

// Grupos teoria
router.get('/grupos', ListarGrupos)
router.get('/grupos/:id', ObtenerGrupoPorId)
router.post('/grupos', CrearGrupo)
router.put('/grupos/:id', ActualizarGrupoPorId)
router.delete('/grupos/:id', EliminarGrupoPorId)

// Instrumentos
router.get('/instrumentos', ListarInstrumentos)
router.get('/instrumentos/:id', ObtenerInstrumentoPorId)
router.post('/instrumentos', CrearInstrumento)
router.put('/instrumentos/:id', ActualizarInstrumentoPorId)
router.delete('/instrumentos/:id', EliminarInstrumentoPorId)

// Insumos
router.get('/insumos', ListarInsumos)
router.get('/insumos/:id', ObtenerInsumoPorId)
router.post('/insumos', CrearInsumo)
router.put('/insumos/:id', ActualizarInsumoPorId)
router.delete('/insumos/:id', EliminarInsumoPorId)

// Instrumento-Insumo (join)
router.get('/instrumento_insumo', ListarInstrumentoInsumo)
router.get('/instrumento_insumo/:cod_instrumento/:cod_insumo', ObtenerInstrumentoInsumo)
router.post('/instrumento_insumo', CrearInstrumentoInsumo)
router.delete('/instrumento_insumo/:cod_instrumento/:cod_insumo', EliminarInstrumentoInsumo)

// Prestamos instrumento
router.get('/prestamos_instrumento', ListarPrestamosInstrumento)
router.get('/prestamos_instrumento/:id', ObtenerPrestamoInstrumentoPorId)
router.post('/prestamos_instrumento', CrearPrestamoInstrumento)
router.put('/prestamos_instrumento/:id', ActualizarPrestamoInstrumentoPorId)
router.delete('/prestamos_instrumento/:id', EliminarPrestamoInstrumentoPorId)

// Prestamos insumo
router.get('/prestamos_insumo', ListarPrestamosInsumo)
router.get('/prestamos_insumo/:id', ObtenerPrestamoInsumoPorId)
router.post('/prestamos_insumo', CrearPrestamoInsumo)
router.put('/prestamos_insumo/:id', ActualizarPrestamoInsumoPorId)
router.delete('/prestamos_insumo/:id', EliminarPrestamoInsumoPorId)

// Alumno-Alergia (join)
router.get('/alumno_alergia', ListarAlumnoAlergia)
router.get('/alumno_alergia/:cod_alergia/:id_alumno', ObtenerAlumnoAlergia)
router.post('/alumno_alergia', CrearAlumnoAlergia)
router.delete('/alumno_alergia/:cod_alergia/:id_alumno', EliminarAlumnoAlergia)
export default router