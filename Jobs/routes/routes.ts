import express from "express";
import { login, register } from "../middleware/authentication";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../middleware/jobs";


const authRouter: express.Router = express.Router();
const jobRouter: express.Router = express.Router();

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);

jobRouter.route('/').post(createJob).get(getAllJobs);
jobRouter.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

export { authRouter, jobRouter };