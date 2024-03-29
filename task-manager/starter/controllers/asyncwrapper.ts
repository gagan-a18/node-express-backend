import { NextFunction, Request, Response } from "express";

const asyncwrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            res.status(500);
            next(error);
        }
    }

}

export default asyncwrapper;