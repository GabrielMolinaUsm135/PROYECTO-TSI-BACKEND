import { Router } from "express";
import { ejemploHandler, ejemploHandlerById } from "./handlers/ejemplo";

const router = Router()

//endpoints
    //cada vez que se invoque la ruta /ruta se debe ejecutar el ejemploHandler
    //localhost:3000/api/ruta
router.get('/ruta', ejemploHandler)

    //ruta para usar con id
    //localhost:3000/api/ruta/1
router.get('/ruta/:id', ejemploHandlerById)

export default router