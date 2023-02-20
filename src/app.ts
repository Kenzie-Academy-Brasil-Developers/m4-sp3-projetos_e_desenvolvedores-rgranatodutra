import express, { Application, json } from "express";
import { startDatabase } from "./database/startDatabase";
import developersRouter from "./routes/developers.routes";
import projectsRouter from "./routes/projects.routes";

const application: Application = express();
application.use(json());

application.use('/developers', developersRouter);
application.use('/projects', projectsRouter);

const PORT: number = 3000;
const startApplicationFunction = async () => {
    await startDatabase();
    console.log(`Server is runnning on https://localhost:${PORT}`);
};

application.listen(PORT, startApplicationFunction);