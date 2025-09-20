import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import Alumno from "../models/alumno";
import Usuario from "../models/usuario";
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize({
    dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [__dirname + '/../models/**/*.ts'], // Ruta a los modelos
  define: { timestamps: false },
}) 

export default db;