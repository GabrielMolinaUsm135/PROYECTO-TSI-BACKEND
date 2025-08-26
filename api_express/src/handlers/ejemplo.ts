import { Request, Response } from "express";

//retorna un mensaje de ejemplo
export const ejemploHandler = async(request:Request,response:Response)=>{
    response.send('ejemplo handler')
}

//retorna un mensaje de ejemplo con id
export const ejemploHandlerById = async(request:Request,response:Response)=>{
    const {id} = request.params
    response.send('ejemplo handler con id: ' + id)
}
