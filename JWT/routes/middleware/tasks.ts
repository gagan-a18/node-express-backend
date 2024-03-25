import { Request, Response } from "express"

const sendResponse = (req: Request, res: Response) => {
    res.status(200).send('successfull');
}

export default sendResponse;