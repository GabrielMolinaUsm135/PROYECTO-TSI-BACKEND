import Express, { response } from "express";
import router from './router'
import db from "./config/database";
import cors,{CorsOptions} from 'cors'

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

//CORS
//!origin es solo para postman, quitar al publicar
const corsoptions: CorsOptions = {
  origin: function(origin, callback){
    if(!origin || origin===process.env.FRONTEND_URL){
      callback(null,true)
    }else{
      callback(new Error("No permitido por CORS"), false)
    }
  }
}

server.use(cors(corsoptions))

//habilitar el uso de json en las peticiones
server.use(Express.json())

//todos los request que comiencen con /api se deben derivar a router.ts
server.use('/api',router)

export default server