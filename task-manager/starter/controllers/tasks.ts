import { Request, Response } from "express";
import Task from "../models/modeltasks";



const getAllTasks = (req: Request, res: Response): void => {
    res.send('All items');
}

const createTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(400).send(error);
    }
}

const getSingleTask = (req: Request, res: Response): void => {
    res.send('Single Task');
}

export { getAllTasks, createTasks, getSingleTask };