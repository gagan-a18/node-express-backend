import { Request, Response } from "express";
import jobModel from "../models/jobModel";
import ErrorRequest from "../errors/errorRequest";
interface CustomRequest extends Request {
    user?: { userId: string };
}

const getAllJobs = async (req: CustomRequest, res: Response) => {
    const userId = req.user?.userId;
    try {
        const allJobs = await jobModel.find({ "createdBy": userId });
        res.status(200).send({ allJobs })
    } catch (error) {
        res.status(500).send(error);
    }

}
const getJob = async (req: CustomRequest, res: Response) => {
    const userId = req.user?.userId;
    try {
        const singleJob = await jobModel.findOne({ "createdBy": userId, "_id": req.params.id });
        if (!singleJob) {
            res.status(400).send('Job does not exist');
            return;
        }
        res.status(200).send({ singleJob });
    } catch (error) {
        res.status(500).send(error);
    }
}
const createJob = async (req: CustomRequest, res: Response) => {
    req.body.createdBy = req.user?.userId;
    try {
        const user = await jobModel.create({ ...req.body });
        res.status(200).send({ user });
    } catch (error) {
        res.status(500).send(error);
    }
}
const updateJob = async (req: CustomRequest, res: Response) => {
    const status = req.body.status;
    const userId = req.user?.userId;
    const jobId = req.params.id;
    if (!status) {
        throw new ErrorRequest('Status strictly required', 404);
    }
    const filter = { "createdBy": userId, "_id": jobId };
    try {
        const updatedJob = await jobModel.findByIdAndUpdate(filter, { "status": status }, { new: true, runValidators: true });
        if (!updatedJob) {
            res.status(400).send('Job does not exist');
            return;
        }
        res.status(200).send({ updatedJob });
    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteJob = async (req: CustomRequest, res: Response) => {
    const userId = req.user?.userId;
    const jobId = req.params.id;
    const filter = { "createdBy": userId, "_id": jobId };
    try {
        const job = await jobModel.findByIdAndDelete(filter);
        if (!job) {
            res.status(400).send('Job does not exist');
            return;
        }
        res.status(200).send('Job Delted');
    } catch (error) {
        res.status(500).send(error);
    }
}
export { getAllJobs, getJob, createJob, updateJob, deleteJob };