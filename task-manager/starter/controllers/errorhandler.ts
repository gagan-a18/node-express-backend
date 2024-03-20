import { NextFunction, Request, Response } from "express";


const errorhandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({ err: err.message })
    return;
}

export default errorhandler;