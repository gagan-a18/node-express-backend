import express from 'express';
import { createTasks, deletetask, getAllTasks, getSingleTask, updatetask } from '../controllers/tasks';

const router: express.Router = express.Router();

router.route('/').get(getAllTasks).post(createTasks);

router.route('/:id').get(getSingleTask).delete(deletetask).patch(updatetask);

export default router;