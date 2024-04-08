import { Request, Response } from "express";
import userModel from "../models/userModel";
import ErrorRequest from "../errors/errorRequest";

const register = async (req: Request, res: Response) => {

    try {
        const user = await userModel.create({ ...req.body });
        const token = user.createJWT();
        res.status(200).send({ user: { name: user.name }, token });
    }
    catch (error) {
        res.status(400).send(error);
    }


}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ErrorRequest('Bad Request', 404);
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new ErrorRequest('Wrong Email', 500);
    }
    const isPasswordCorrect = await user?.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new ErrorRequest('Wrong Password', 500);
    }
    const token = user.createJWT();
    res.status(200).send({ user: { name: user.name }, token });

}

export { register, login };