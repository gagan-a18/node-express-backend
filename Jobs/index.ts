import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import connectDb from "./connection/connectDb";
import { authRouter, jobRouter } from "./routes/routes";
import errorHandler from "./errors/errorHandler";


dotenv.config();

const app: express.Application = express();

const port: Number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use('/domain/api/v1/auth', authRouter);
app.use('/domain/api/v1/jobs', jobRouter);

app.use(errorHandler);

const startServer = async () => {
    await connectDb(`${process.env.MONGO_DB_URI}`)
        .then(() => {
            console.log('Connected to DB');
            app.listen(port, () => {
                console.log(`Server running on port : ${port}`);
            })
        })
        .catch(err => console.log(err));
}
startServer();


