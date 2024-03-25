import express from "express"
import sendResponse from "./middleware/tasks";


const router: express.Router = express.Router();

router.route('/').get(sendResponse);

export default router;