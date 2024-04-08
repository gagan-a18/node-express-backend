import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import connectDb from "./connection/connectDb";
import { authRouter, jobRouter } from "./routes/routes";
import errorHandler from "./errors/errorHandler";
import tokenAuth from "./middleware/tokenAuth";
import helmet from "helmet";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";


const swaggerDocument = YAML.load('./swagger.yaml');

dotenv.config();

const app: express.Application = express();

const port: Number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/domain/api/v1/auth', authRouter);
app.use('/domain/api/v1/jobs', tokenAuth, jobRouter);

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


