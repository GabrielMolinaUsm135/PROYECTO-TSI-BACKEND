import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function VerificarToken(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(' ')[1]; //separa Bearer del token (bearer token)
    const SECRET = process.env.SECRET_KEY;

    try {
        const decoded = jwt.verify(token, SECRET);
        (request as any).user = decoded;
        next();
    } catch (error) {
        response.status(401).json({ error: "Token inválido o expirado" });
    }
}