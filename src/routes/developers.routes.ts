import { Router } from "express";
import { createNewDeveloper } from "../logic/developers/createNewDeveloper";
import { deleteDeveloper } from "../logic/developers/deleteDeveloper";
import { getDeveloperById } from "../logic/developers/getDeveloperById";
import { insertNewDeveloperInfo } from "../logic/developers/insertNewDeveloperInfo";
import { listDevelopers } from "../logic/developers/listDevelopers";
import { updateDeveloper } from "../logic/developers/updateDeveloper";
import { updateDeveloperInfo } from "../logic/developers/updateDeveloperInfo";
import { listDeveloperProjects } from "../logic/projects/listDeveloperProjects";
import { validateDeveloperBody } from "../middlewares/developers/validateDeveloperBody";
import { validateDeveloperInfoBody } from "../middlewares/developers/validateDeveloperInfoBody";
import { verifyDeveloperIdExist } from "../middlewares/developers/verifyDeveloperIdExist";
import { verifyDeveloperInfoExist } from "../middlewares/developers/verifyDeveloperInfoExist";
import { verifyEmailExists } from "../middlewares/developers/verifyEmailExists";

const developersRouter = Router();

developersRouter.get('',
    listDevelopers
);

developersRouter.get('/:developerId',
    verifyDeveloperIdExist,
    getDeveloperById
);

developersRouter.post('',
    validateDeveloperBody,
    verifyEmailExists,
    createNewDeveloper
);

developersRouter.patch('/:developerId',
    verifyDeveloperIdExist,
    validateDeveloperBody,
    verifyEmailExists,
    updateDeveloper
);

developersRouter.delete('/:developerId',
    verifyDeveloperIdExist,
    deleteDeveloper
);

developersRouter.post('/:developerId/infos',
    verifyDeveloperIdExist,
    verifyDeveloperInfoExist,
    validateDeveloperInfoBody,
    insertNewDeveloperInfo
);

developersRouter.patch('/:developerId/infos',
    verifyDeveloperIdExist,
    verifyDeveloperInfoExist,
    validateDeveloperInfoBody,
    updateDeveloperInfo
);

developersRouter.get('/:developerId/projects',
    verifyDeveloperIdExist,
    listDeveloperProjects
);

export default developersRouter;