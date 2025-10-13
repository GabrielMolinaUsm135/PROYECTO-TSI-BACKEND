import { Router } from "express";
import { ejemploHandler, ejemploHandlerById } from "./handlers/ejemplo";
import {
    ListarAlumnos,
    ObtenerAlumnoPorRut,
    CrearAlumno,
    ActualizarAlumnoPorRut,
    EliminarAlumnoPorRut,
    ObtenerApoderadoDeAlumno,
    ObtenerClasesDeAlumno,
    ObtenerInstrumentosDeAlumno,
    ObtenerNotasDeAlumno,
    CrearNotaParaAlumno,
    ActualizarNotaPorRutYFecha,
    EliminarNotaPorRutYFecha,
    ListarPrestamos,
    ObtenerPrestamoPorId,
    CrearPrestamoInstrumentos,
    DevolverInstrumentoPorIdPrestamo,
    CrearPrestamoInsumos,
    DevolverInsumoPorIdPrestamo,
    ObtenerAlumnoPorNombre,
    ObtenerAlumnoPorNombreApellido,
    ObtenerAlumnoPorNombreApellidoPM,
    ObtenerAlumnoPorApellidoP
} from "./handlers/alumno";
import { crearUsuario, login } from "./handlers/usuarios";
import { VerificarToken } from "./middleware/verificar";

const router = Router()

//Login :D

router.post('/login', login) //login usuario
router.post('/user/crear', crearUsuario) //registro usuario


//MiddLeware 
router.use(VerificarToken)
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
/*
router.get('/alumno/:rut/apoderado', ObtenerApoderadoDeAlumno) //obtener el apoderado de un alumno por rut
router.get('/alumno/:rut/clases', ObtenerClasesDeAlumno) //obtener las clases de un alumno por rut
router.get('/alumno/:rut/instrumentos', ObtenerInstrumentosDeAlumno) //obtener los instrumentos de un alumno por rut
    //notas
router.get('/alumno/:rut/notas', ObtenerNotasDeAlumno) //obtener todas las notas de un alumno por rut
router.post('/alumno/:rut/nota/:fecha', CrearNotaParaAlumno) //crear una nota para un alumno por rut
router.put('/alumno/:rut/nota/:fecha', ActualizarNotaPorRutYFecha) //actualizar una nota por rut y fecha
router.delete('/alumno/:rut/nota/:fecha', EliminarNotaPorRutYFecha) //eliminar una nota por rut y fecha
*/

/*
//prestamos
    //instrumentos
router.get('/lista/prestamos', ListarPrestamos) //listar prestamos
router.get('/prestamo/:id', ObtenerPrestamoPorId) //obtener un prestamo por id
router.post('/prestamo/instrumentos', CrearPrestamoInstrumentos) //crear un prestamo
router.put('/prestamo/instrumento/:id', DevolverInstrumentoPorIdPrestamo) //devolver un instrumento por id de prestamo

    //insumos
router.post('/prestamo/insumos', CrearPrestamoInsumos) //crear un prestamo de insumos
router.put('/prestamo/insumo/:id', DevolverInsumoPorIdPrestamo) //devolver un insumo por id de prestamo
*/
/*
//apoderado
router.get('/lista/apoderados',) //listar apoderados
router.get('/apoderado/:rut',) //obtener un apoderado por rut
router.post('/apoderado',) //crear un apoderado
router.put('/apoderado/:rut',) //actualizar un apoderado por rut
router.delete('/apoderado/:rut',) //eliminar un apoderado por rut
router.get('/alumno/:rut/alergias',) //obtener las alergias de un alumno por rut

//instrumento
router.get('/lista/instrumentos',) //listar instrumentos
router.get('/instrumento/:id',) //obtener un instrumento por id
router.post('/instrumento',) //crear un instrumento
router.put('/instrumento/:id',) //actualizar un instrumento por id
router.delete('/instrumento/:id',) //eliminar un instrumento por id

router.get('/instrumento/id/insumos',) //obtener los insumos de un instrumento por id
router.post('/instrumento/:id/insumo/:idInsumo',) //asociar un insumo a un instrumento
router.delete('/instrumento/:id/insumo/:idInsumo',) //desasociar un insumo a un instrumento

//insumo
router.get('/lista/insumos',) //listar insumos
router.get('/insumo/:id',) //obtener un insumo por id
router.post('/insumo',) //crear un insumo
router.put('/insumo/:id',) //actualizar un insumo por id
router.delete('/insumo/:id',) //eliminar un insumo por id

//alergia
router.post('/alergia',) //crear una alergia
router.delete('/alergia/:id',) //eliminar una alergia por id
router.post('/alumno/:rut/alergia/:id',) //asociar una alergia a un alumno
router.delete('/alumno/:rut/alergia/:id',) //desasociar una alergia a un alumno

//profesor
router.get('/lista/profesores',) //listar profesores
router.get('/profesor/:rut',) //obtener un profesor por rut
router.post('/profesor',) //crear un profesor
router.put('/profesor/:rut',) //actualizar un profesor por rut
router.delete('/profesor/:rut',) //eliminar un profesor por rut
router.get('/profesor/:rut/clases',) //obtener las clases de un profesor por rut

//clase
router.get('/lista/clases',) //listar clases
router.get('/clase/:id',) //obtener una clase por id
router.post('/clase',) //crear una clase
router.put('/clase/:id',) //actualizar una clase por id
router.delete('/clase/:id',) //eliminar una clase por id
router.post('/clase/:id/alumno/:rut',) //asociar un alumno a una clase
router.delete('/clase/:id/alumno/:rut',) //desasociar un alumno a una clase

//grupos teoria
router.get('/lista/grupos',) //listar grupos de teoria
router.post('/grupo',) //crear un grupo de teoria
router.put('/grupo/:id',) //actualizar un grupo de teoria por id
router.delete('/grupo/:id',) //eliminar un grupo de teoria por id

*/

export default router