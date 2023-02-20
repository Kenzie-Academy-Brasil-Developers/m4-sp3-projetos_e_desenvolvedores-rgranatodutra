import express, { Application, json } from "express";
import { startDatabase } from "./database/startDatabase";
import { createNewDeveloper } from "./logic/developers/createNewDeveloper";
import { deleteDeveloper } from "./logic/developers/deleteDeveloper";
import { getDeveloperById } from "./logic/developers/getDeveloperById";
import { insertNewDeveloperInfo } from "./logic/developers/insertNewDeveloperInfo";
import { listDevelopers } from "./logic/developers/listDevelopers";
import { updateDeveloper } from "./logic/developers/updateDeveloper"
import { updateDeveloperInfo } from "./logic/developers/updateDeveloperInfo";
import { createNewProject } from "./logic/projects/createNewProject";
import { updateProject } from "./logic/projects/updateProject";
import { validateDeveloperBody } from "./middlewares/developers/validateDeveloperBody";
import { validateDeveloperInfoBody } from "./middlewares/developers/validateDeveloperInfoBody";
import { verifyDeveloperIdExist } from "./middlewares/developers/verifyDeveloperIdExist";
import { verifyDeveloperInfoExist } from "./middlewares/developers/verifyDeveloperInfoExist";
import { verifyEmailExists } from "./middlewares/developers/verifyEmailExists";
import { validateProjectBodyKeys } from "./middlewares/projects/validateProjectBodyKeys";
import { validateProjectBodyValues } from "./middlewares/projects/validateProjectBodyValues";
import { validateProjectDeveloperId } from "./middlewares/projects/validateProjectDeveloperId";
import { verifyProjectIdExist } from "./middlewares/projects/verifyProjectIdExist";

const application: Application = express();
application.use(json());

application.get('/developers',
    listDevelopers
);

application.get('/developers/:developerId',
    verifyDeveloperIdExist,
    getDeveloperById
);

application.post('/developers',
    validateDeveloperBody,
    verifyEmailExists,
    createNewDeveloper
);

application.patch('/developers/:developerId',
    verifyDeveloperIdExist,
    validateDeveloperBody,
    verifyEmailExists,
    updateDeveloper
);

application.delete('/developers/:developerId',
    verifyDeveloperIdExist,
    deleteDeveloper
);

application.post('/developers/:developerId/infos',
    verifyDeveloperIdExist,
    verifyDeveloperInfoExist,
    validateDeveloperInfoBody,
    insertNewDeveloperInfo
);

application.patch('/developers/:developerId/infos',
    verifyDeveloperIdExist,
    verifyDeveloperInfoExist,
    validateDeveloperInfoBody,
    updateDeveloperInfo
);

application.post('/projects',
    validateProjectBodyKeys,
    validateProjectBodyValues,
    validateProjectDeveloperId,
    createNewProject
);

application.patch('/projects/:projectId',
    verifyProjectIdExist,
    validateProjectBodyKeys,
    validateProjectBodyValues,
    validateProjectDeveloperId,
    updateProject
);

const PORT: number = 3000;
const startApplicationFunction = async () => {
    await startDatabase();
    console.log(`Server is runnning on https://localhost:${PORT}`);
};

application.listen(PORT, startApplicationFunction);