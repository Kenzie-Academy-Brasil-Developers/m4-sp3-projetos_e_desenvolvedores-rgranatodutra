import express, { Application, json } from "express";
import { startDatabase } from "./database/startDatabase";
import { createNewDeveloper } from "./logic/createNewDeveloper";
import { getDeveloperById } from "./logic/getDeveloperById";
import { insertNewDeveloperInfo } from "./logic/insertNewDeveloperInfo";
import { listDevelopers } from "./logic/listDevelopers";
import { validateDeveloperBody } from "./middlewares/validateDeveloperBody";
import { validateEmailExists } from "./middlewares/validateEmailExists";

const application: Application = express();
application.use(json());

application.post('/developers',
    validateDeveloperBody,
    validateEmailExists,
    createNewDeveloper
);

application.get('/developers',
    listDevelopers
);

application.get('/developers/:developerId',
    getDeveloperById
);

application.post('/developers/:developerId/infos',
    insertNewDeveloperInfo
);

const PORT: number = 3000;
const startApplicationFunction = async () => {
    await startDatabase();
    console.log(`Server is runnning on https://localhost:${PORT}`);
};

application.listen(PORT, startApplicationFunction);