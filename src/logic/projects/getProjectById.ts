import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/client";
import { Project } from "../../interfaces/projects";

export async function getProjectById(req: Request, res: Response): Promise<Response> {
    const queryTemplate: string = `
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
            projects AS p
        LEFT JOIN projects_technologies AS pt
            ON p."id" = pt."projectId"
        LEFT JOIN technologies AS t
            ON t."id" = pt."technologyId"
        WHERE
            P."id" = $1
        ;
    `;

    const queryConfig: QueryConfig = {
        text: queryTemplate,
        values: [req.params.projectId]
    }

    const queryResult: QueryResult<Project> = await client.query(queryConfig);
    const projectsList: Project[] = queryResult.rows;

    return res.status(200).json(projectsList);
};