import { NextFunction, Request, Response } from "express"
import BadRequest from "../../errors/badrequest";

const errorHandler = (err: BadRequest, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).send(err.message);
}

export default errorHandler