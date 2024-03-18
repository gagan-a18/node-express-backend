import { Request, Response } from "express";
import Task from "../models/modeltasks";



const getAllTasks = (req: Request, res: Response) => {
    res.send('All items');
}

const createTasks = async (req: Request, res: Response) => {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
}

const getSingleTask = (req: Request, res: Response) => {
    res.send('Single Task');
}

export { getAllTasks, createTasks, getSingleTask };