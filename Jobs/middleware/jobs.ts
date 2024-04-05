import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: JwtPayload;
}

const getAllJobs = (req: CustomRequest, res: Response) => {
    res.send(req.user);
}
const getJob = (req: Request, res: Response) => {
    res.send('get Job');
}
const createJob = (req: Request, res: Response) => {
    res.send('create Job');
}
const updateJob = (req: Request, res: Response) => {
    res.send('update Job');
}
const deleteJob = (req: Request, res: Response) => {
    res.send('delete Job');
}
export { getAllJobs, getJob, createJob, updateJob, deleteJob };