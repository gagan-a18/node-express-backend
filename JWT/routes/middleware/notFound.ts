import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
    res.status(500).send(`${req.url} Not Found`);
}

export default notFound;