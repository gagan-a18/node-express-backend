import { NextFunction, Request, Response } from "express";
import ErrorRequest from "./errorRequest";

const errorHandler = (err: ErrorRequest, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.statusCode).send(err.message);
}

export default errorHandler;