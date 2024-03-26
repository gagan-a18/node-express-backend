import express, { NextFunction, Request, Response } from "express"
import router from "./routes/routes";
import dotenv from "dotenv";
import notFound from "./routes/middleware/notFound";
import "express-async-errors";
import errorHandler from "./routes/middleware/errorHandler";

dotenv.config();

const app: express.Application = express();

const port: Number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use('/api/v1/basic', router)

app.use(notFound);
app.use(errorHandler);

const startserver = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server running on port:${port}`);
        })
    }
    catch (error) {
        console.log(error);
    }
}

startserver();

