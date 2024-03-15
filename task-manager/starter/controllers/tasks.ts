import { Request, Response } from "express";


const getAllTasks = (req: Request, res: Response) => {
    res.send('All items');
}

const createTasks = (req: Request, res: Response) => {
    res.send('Create Task');
}

const getSingleTask = (req: Request, res: Response) => {
    res.send('Single Task');
}

export { getAllTasks, createTasks, getSingleTask };