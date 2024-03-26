import { Request, Response } from "express"
import jwt from "jsonwebtoken";

const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw Error('BAD Request');
    }
    const id = new Date().getDate();

    const token = jwt.sign({ id, username }, `${process.env.JWT_SECRET}`, { expiresIn: "30d" })
    res.status(200).send({ msg: 'User Created', token });
}

const dashboard = async (req: Request, res: Response) => {
    const number = Math.floor(Math.random() * 100);
    res.status(200).json({ 'msg': 'hello', secret: `Your number is ${number}` })

}

export { login, dashboard };