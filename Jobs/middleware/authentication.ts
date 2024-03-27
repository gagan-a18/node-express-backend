import { Request, Response } from "express";
import userModel from "../models/userModel";

const register = async (req: Request, res: Response) => {
    try {
        const user = await userModel.create({ ...req.body });
        res.status(200).send({ user });
    } catch (error) {
        res.status(300).send(error);
    }

}

const login = (req: Request, res: Response) => {
    res.send('login job');
}

export { register, login };