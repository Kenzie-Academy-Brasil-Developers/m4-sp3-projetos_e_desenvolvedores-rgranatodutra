import { Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../../database/client";
import { Project } from "../../interfaces/projects";

export async function listProjects(req: Request, res: Response): Promise<Response> {
    const queryString: string = `
        SELECT 
            p."id" AS "projectId",
            p."name" AS "projectName",
            p."description" AS "projectDescription",
            p."estimatedTime" AS "projectEstimatedTime",
            p."repository" AS "projectRepository",
            p."startDate" AS "projectStartDate",
            p."endDate" AS "projectEndDate",
            p."developerId" AS "projectDeveloperId",
            pt."technologyId",
            t."name" as "technologyName"
        FROM 
            projects_technologies AS pt
        LEFT JOIN projects AS p
            ON p."id" = pt."projectId"
        LEFT JOIN technologies AS t
            ON t."id" = pt."technologyId"
        ;
    `;

    const queryResult: QueryResult<Project> = await client.query(queryString);
    const projectsList: Project[] = queryResult.rows;

    return res.status(200).json(projectsList);
};