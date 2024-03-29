import express from "express";
import router from "./routes/tasks";
import dotenv from "dotenv";
import connectDB from "./connection/connect";
import errorhandler from "./controllers/errorhandler";

dotenv.config();

const app: express.Application = express();

const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use('/api/v1/tasks', router);

app.use(errorhandler);

const startserver = async () => {
    try {
        await connectDB(`${process.env.MONGO_DB_CONN_URI}`)
            .then(() => console.log('Connected to DB'));
        app.listen(port, () => { console.log(`Server is running on port ${port}`); })
    }
    catch (error) {
        console.log(error);
    }
}

startserver();



