import { NextFunction, Request, Response } from "express"

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send(err.message);
}

export default errorHandler