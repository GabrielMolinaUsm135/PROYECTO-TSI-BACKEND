import Express, { response } from "express";
import router from './router'

const server = Express()

//todos los request que comiencen con /api se deben derivar a router.ts
server.use('/api',router)

export default server