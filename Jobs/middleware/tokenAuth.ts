import ErrorRequest from "../errors/errorRequest";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: {};
}

const tokenAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
    const Authorization = req.headers.authorization;
    if (!Authorization || !Authorization.startsWith('Bearer')) {
        throw new ErrorRequest('Token not Found', 404);
    }
    const token = Authorization.split(' ')[1];
    try {
        const payload = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
        req.user = { userId: payload.userId, name: payload.name };
    } catch (error) {
        throw new ErrorRequest('Error', 500)
    }
    next();
}

export default tokenAuth;