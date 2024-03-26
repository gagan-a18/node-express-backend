import { Request, Response } from "express"
import jwt from "jsonwebtoken";
import ErrorRequest from "../../errors/badrequest";

interface JwtPayload {
    username?: string;
}

const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new ErrorRequest('BAD Request', 400);
    }
    const id = new Date().getDate();

    const token = jwt.sign({ id, username }, `${process.env.JWT_SECRET}`, { expiresIn: "30d" })
    res.status(200).send({ msg: 'User Created', token });
}

const dashboard = (req: Request, res: Response) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ErrorRequest('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
        const number = Math.floor(Math.random() * 100);
        res.status(200).json({ 'msg': `Hello ${decoded.username}`, secret: `Your number is ${number}` })
    }
    catch (error) {
        throw new ErrorRequest('Not authorized to access this route', 401)
    }
}

export { login, dashboard };