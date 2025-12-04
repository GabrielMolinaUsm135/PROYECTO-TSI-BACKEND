import { Router } from "express";
import { ejemploHandler, ejemploHandlerById } from "./handlers/ejemplo";
import {
    ListarAlumnos,
    ObtenerAlumnoPorRut,
    ObtenerAlumnoPorUsuarioId,
    CrearAlumno,
    ActualizarAlumnoPorRut,
    EliminarAlumnoPorRut,
    EliminarAlumnoPorId,
    ObtenerAlumnoPorNombre,
    ObtenerAlumnoPorNombreApellido,
    ObtenerAlumnoPorNombreApellidoPM,
    ObtenerAlumnoPorApellidoP,
    ObtenerAlumnoPorId
} from "./handlers/alumno";
import { ActualizarUsuarioPorId, crearUsuario, ListarUsuarios, login, ObtenerUsuarioPorId } from "./handlers/usuarios";
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
    ListarRutApoderados,
    ObtenerApoderadoPorRut,
    CrearApoderado,
    ActualizarApoderadoPorId,
    EliminarApoderadoPorId,
    ApoderadoTieneHijo
} from "./handlers/apoderado";
import { ListarAlumnosPorApoderado } from "./handlers/apoderado";
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
    ObtenerGrupoPorNombre,
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
    ListarInstrumentoInsumoPorInstrumento,
    ListarInstrumentoInsumoPorInsumo,
    ListarInsumosConInstrumento,
    ListarCodigosInsumosConInstrumento,
    CrearInstrumentoInsumo,
    EliminarInstrumentoInsumo
} from "./handlers/instrumento_insumo";
import {
    ListarPrestamosInstrumento,
    ObtenerPrestamoInstrumentoPorId,
    ListarCodigosPrestamosInstrumento,
    ListarCodigosPrestamos,
    InstrumentoEstaEnUso,
    ListarPrestamosPorUsuario,
    CrearPrestamoInstrumento,
    ActualizarPrestamoInstrumentoPorId,
    EliminarPrestamoInstrumentoPorId
} from "./handlers/prestamo_instrumento";
import {
    ListarPrestamosInsumo,
    ObtenerPrestamoInsumoPorId,
    InsumoEstaEnUso,
    CrearPrestamoInsumo,
    ActualizarPrestamoInsumoPorId,
    EliminarPrestamoInsumoPorId
} from "./handlers/prestamo_insumo";
import {
    ListarAlumnoAlergia,
    ObtenerAlumnoAlergia,
    ListarAlergiasPorAlumno,
    CrearAlumnoAlergia,
    EliminarAlumnoAlergia
} from "./handlers/alumno_alergia";
import { ListarClases } from "./handlers/clase";
import { añadirimagen, Listarimagenes, ObtenerimagenPorId, EliminarImagenporId } from "./handlers/imagenes";
import { añadirimagenIns, ListarimagenesIns, ObtenerimagenInsPorCod, EliminarImagenInsPorId} from "./handlers/imagenesIns";
import { añadirimagenTru, ListarimagenesTru, ObtenerimagenTruPorCod, EliminarImagenTruPorId } from "./handlers/imagenestru";
const router = Router()

//Login :D

router.post('/login', login) //login usuario
router.post('/user/crear', crearUsuario) //registro usuario
router.get('/usuarios', ListarUsuarios); //listar usuarios
router.get('/usuarios/:id', ObtenerUsuarioPorId); //obtener usuario por id
router.put('/usuarios/:id', ActualizarUsuarioPorId); //actualizar usuario por id

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
router.get('/alumno/id/:id', ObtenerAlumnoPorId) //obtener un alumno por id
router.get('/alumno/usuario/:id_usuario', ObtenerAlumnoPorUsuarioId) //obtener alumno por id_usuario

// Roles
router.get('/roles', ListarRoles)
router.get('/roles/:id', ObtenerRolPorId)
router.post('/roles', CrearRol)
router.put('/roles/:id', ActualizarRolPorId)
router.delete('/roles/:id', EliminarRolPorId)

// Apoderados
router.get('/apoderados', ListarApoderados)
router.get('/apoderados/ruts', ListarRutApoderados)
router.get('/apoderados/rut/:rut', ObtenerApoderadoPorRut)
router.get('/apoderados/:id', ObtenerApoderadoPorId)
router.get('/apoderados/:id/tiene-hijo', ApoderadoTieneHijo)
router.get('/apoderados/:id/alumnos', ListarAlumnosPorApoderado)
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
router.get('/grupos/nombre/:nombre', ObtenerGrupoPorNombre)
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
router.get('/instrumento_insumo/:cod_instrumento', ListarInstrumentoInsumoPorInstrumento)
router.get('/instrumento_insumo/insumo/:cod_insumo', ListarInstrumentoInsumoPorInsumo)
router.get('/instrumento_insumo/:cod_instrumento/:cod_insumo', ObtenerInstrumentoInsumo)
router.post('/instrumento_insumo', CrearInstrumentoInsumo)
router.delete('/instrumento_insumo/:cod_instrumento/:cod_insumo', EliminarInstrumentoInsumo)

// Prestamos instrumento
router.get('/prestamos_instrumento', ListarPrestamosInstrumento)
router.get('/prestamos_instrumento/ocupado/:cod_instrumento', InstrumentoEstaEnUso)
router.get('/prestamos/usuario/:id_usuario', ListarPrestamosPorUsuario)
router.get('/prestamos_instrumento/:id', ObtenerPrestamoInstrumentoPorId)
router.get('/prestamos_instrumento/codigos', ListarCodigosPrestamosInstrumento)
router.get('/prestamos/codigos', ListarCodigosPrestamos)
router.post('/prestamos_instrumento', CrearPrestamoInstrumento)
router.put('/prestamos_instrumento/:id', ActualizarPrestamoInstrumentoPorId)
router.delete('/prestamos_instrumento/:id', EliminarPrestamoInstrumentoPorId)

// Prestamos insumo
router.get('/prestamos_insumo', ListarPrestamosInsumo)
router.get('/prestamos_insumo/ocupado/:cod_insumo', InsumoEstaEnUso)
router.get('/prestamos_insumo/:id', ObtenerPrestamoInsumoPorId)
router.post('/prestamos_insumo', CrearPrestamoInsumo)
router.put('/prestamos_insumo/:id', ActualizarPrestamoInsumoPorId)
router.delete('/prestamos_insumo/:id', EliminarPrestamoInsumoPorId)

// Alumno-Alergia (join)
router.get('/alumno_alergia', ListarAlumnoAlergia)
router.get('/alumno_alergia/alumno/:id_alumno', ListarAlergiasPorAlumno)
router.get('/alumno_alergia/:cod_alergia/:id_alumno', ObtenerAlumnoAlergia)
router.post('/alumno_alergia', CrearAlumnoAlergia)
router.delete('/alumno_alergia/:cod_alergia/:id_alumno', EliminarAlumnoAlergia)
// imagenes
router.get('/imagenes', Listarimagenes);
router.get('/imagenes/:id', ObtenerimagenPorId);
router.post('/imagenes', añadirimagen);
router.delete('/imagenes/:id', EliminarImagenporId);
// imagenes insumos
router.get('/imagenesIns', ListarimagenesIns);
router.get('/imagenesIns/:cod_insumo', ObtenerimagenInsPorCod);
router.post('/imagenesIns', añadirimagenIns);
router.delete('/imagenesIns/:cod_insumo', EliminarImagenInsPorId);
// imagenes instrumentos
router.get('/imagenesTru', ListarimagenesTru);
router.get('/imagenesTru/:cod_instrumento', ObtenerimagenTruPorCod);
router.post('/imagenesTru', añadirimagenTru);
router.delete('/imagenesTru/:cod_instrumento', EliminarImagenTruPorId);

export default router