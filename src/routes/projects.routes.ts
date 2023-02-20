import { Router } from "express";
import { createNewProject } from "../logic/projects/createNewProject";
import { deleteProject } from "../logic/projects/deleteProject";
import { deleteProjectTechnology } from "../logic/projects/deleteProjectTechnology";
import { getProjectById } from "../logic/projects/getProjectById";
import { insertNewProjectTechnology } from "../logic/projects/insertNewProjectTechnology";
import { listProjects } from "../logic/projects/listProjects";
import { updateProject } from "../logic/projects/updateProject";
import { validateProjectBodyKeys } from "../middlewares/projects/validateProjectBodyKeys";
import { validateProjectBodyValues } from "../middlewares/projects/validateProjectBodyValues";
import { validateProjectDeveloperId } from "../middlewares/projects/validateProjectDeveloperId";
import { validateProjectTechnology } from "../middlewares/projects/validateProjectTechnology";
import { verifyDuplicatedTechnology } from "../middlewares/projects/verifyDuplicatedTechnology";
import { verifyProjectIdExist } from "../middlewares/projects/verifyProjectIdExist";
import { verifyRelationshipExist } from "../middlewares/projects/verifyRelationshipExist";

const projectsRouter = Router();

projectsRouter.post('',
    validateProjectBodyKeys,
    validateProjectBodyValues,
    validateProjectDeveloperId,
    createNewProject
);

projectsRouter.patch('/:projectId',
    verifyProjectIdExist,
    validateProjectBodyKeys,
    validateProjectBodyValues,
    validateProjectDeveloperId,
    updateProject
);

projectsRouter.post('/:projectId/technologies',
    verifyProjectIdExist,
    validateProjectTechnology,
    verifyDuplicatedTechnology,
    insertNewProjectTechnology
);

projectsRouter.get('',
    listProjects
);

projectsRouter.get('/:projectId',
    verifyProjectIdExist,
    getProjectById
);

projectsRouter.delete('/:projectId',
    verifyProjectIdExist,
    deleteProject
);

projectsRouter.delete('/:projectId/technologies/:technologyName',
    verifyProjectIdExist,
    verifyRelationshipExist,
    deleteProjectTechnology
);

export default projectsRouter;