import express from 'express';
import { createTasks, getAllTasks, getSingleTask } from '../controllers/tasks';

const router: express.Router = express.Router();

router.route('/').get(getAllTasks).post(createTasks);

router.route('/:id').get(getSingleTask);

export default router;