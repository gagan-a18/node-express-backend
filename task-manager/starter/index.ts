import express from "express";
import router from "./routes/tasks";

const app: express.Application = express();

const port: number = 3000;

app.use(express.json());

app.use('/api/v1/tasks', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

