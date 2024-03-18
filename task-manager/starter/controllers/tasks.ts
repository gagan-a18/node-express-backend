import { Request, Response } from "express";
import Task from "../models/modeltasks";



const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).send({ error });
    }
}

const createTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const getSingleTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const task = await Task.findOne({ _id: id });
        if (!task) {
            res.status(404).json({ msg: `No task with Id ${id}` });
            return;
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error);
    }
}

export { getAllTasks, createTasks, getSingleTask };