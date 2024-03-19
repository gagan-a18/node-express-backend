import { Request, Response } from "express";
import Task from "../models/modeltasks";
import asyncwrapper from "./asyncwrapper";



const getAllTasks = asyncwrapper(async (req: Request, res: Response): Promise<void> => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
})

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

const deletetask = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const task = await Task.findOneAndDelete({ _id: id });
        if (!task) {
            res.status(404).send(`Not Found`);
            return;
        }
        res.status(200).send(`Deleted task with id: ${id}`)
    } catch (error) {
        res.status(500).send(error);
    }
}

const updatetask = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const task = await Task.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
        if (!task) {
            res.status(404).send(`Not Found`);
            return;
        }
        res.status(200).send({ task });
    } catch (error) {
        res.status(500).send(error);
    }
}

export { getAllTasks, createTasks, getSingleTask, deletetask, updatetask };