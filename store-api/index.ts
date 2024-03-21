import express from "express";
import dotenv from "dotenv";
import connectdb from "./connection/connectdb";
import router from "./routes/router";
import "express-async-errors";
import errorHandler from "./routes/middleware/errorHandler";

dotenv.config();

const app: express.Application = express()

const port: number = 3000

app.use(express.json());

app.use('/api/v1/products', router);

app.use(errorHandler);

const startserver = async () => {
    await connectdb(`${process.env.MONGO_DB_URI}`)
        .then(() => {
            console.log('Connected to DB');
            app.listen(port, () => console.log(`Server running on port : ${port}`));
        })
        .catch((error) => {
            console.log(error);
        })
}

startserver();


