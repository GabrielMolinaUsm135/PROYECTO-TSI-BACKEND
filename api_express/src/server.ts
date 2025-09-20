import Express, { response } from "express";
import router from './router'
import db from "./config/database";

const server = Express()

async function conectarBD(){
    try {
    await db.authenticate();
    db.sync();
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.log("Error al conectar a la base de datos:");
    console.error(error);
  }
}

conectarBD()

//habilitar el uso de json en las peticiones
server.use(Express.json())

//todos los request que comiencen con /api se deben derivar a router.ts
server.use('/api',router)

export default server