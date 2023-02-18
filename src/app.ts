import express, { Application, json } from "express";
import { startDatabase } from "./database/startDatabase";
import { createNewDeveloper } from "./logic/developers/createNewDeveloper";
import { getDeveloperById } from "./logic/developers/getDeveloperById";
import { insertNewDeveloperInfo } from "./logic/developers/insertNewDeveloperInfo";
import { listDevelopers } from "./logic/developers/listDevelopers";
import { updateDeveloper } from "./logic/developers/updateDeveloper"
import { validateDeveloperBody } from "./middlewares/validateDeveloperBody";
import { validateDeveloperInfoBody } from "./middlewares/validateDeveloperInfoBody";
import { verifyDeveloperIdExists } from "./middlewares/verifyDeveloperIdExists";
import { verifyEmailExists } from "./middlewares/verifyEmailExists";

const application: Application = express();
application.use(json());

application.get('/developers',
    listDevelopers
);

application.get('/developers/:developerId',
    verifyDeveloperIdExists,
    getDeveloperById
);

application.post('/developers',
    validateDeveloperBody,
    verifyEmailExists,
    createNewDeveloper
);

application.patch('/developers/:developerId',
    verifyDeveloperIdExists,
    validateDeveloperBody,
    verifyEmailExists,
    updateDeveloper
);

application.post('/developers/:developerId/infos',
    verifyDeveloperIdExists,
    validateDeveloperInfoBody,
    insertNewDeveloperInfo
);



const PORT: number = 3000;
const startApplicationFunction = async () => {
    await startDatabase();
    console.log(`Server is runnning on https://localhost:${PORT}`);
};

application.listen(PORT, startApplicationFunction);