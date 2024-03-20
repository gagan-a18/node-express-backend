import { NextFunction, Request, Response } from "express";
import Task from "../models/modeltasks";
import asyncwrapper from "./asyncwrapper";
import { createcustomerror } from "./customerror";


const getAllTasks = asyncwrapper(async (req: Request, res: Response): Promise<void> => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
})

const createTasks = asyncwrapper(async (req: Request, res: Response): Promise<void> => {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
})

const getSingleTask = asyncwrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const id = req.params.id;
    const task = await Task.findOne({ _id: id });
    if (!task) {
        res.status(404);
        return next(createcustomerror('Not Found'));
    }
    res.status(200).send(task)
})

const deletetask = asyncwrapper(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) {
        res.status(404);
        return next(createcustomerror('Not Found'));
    }
    res.status(200).send(`Deleted task with id: ${id}`)
})

const updatetask = asyncwrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
    if (!task) {
        res.status(404);
        return next(createcustomerror('Not Found'));
    }
    res.status(200).send({ task });
})

export { getAllTasks, createTasks, getSingleTask, deletetask, updatetask };