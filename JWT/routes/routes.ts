import express from "express"
import { dashboard, login } from "./middleware/tasks";


const router: express.Router = express.Router();


router.route('/dashboard').get(dashboard);

router.route('/login').post(login);

export default router;