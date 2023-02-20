import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/client";
import { Project } from "../../interfaces/projects";

export async function listDeveloperProjects(req: Request, res: Response): Promise<Response> {
    const queryString: string = `
        SELECT 
            d."id" AS "developerId",
            d."name" AS "developerName",
            d."email" AS "developerEmail",
            d."developerInfoId",
            di."developerSince" as "developerInfoDeveloperSince",
            di."preferredOS" as "developerInfoPreferredOS",
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
        FROM developers AS d
        LEFT JOIN developer_infos AS di
            ON di."id" = d."developerInfoId"
        LEFT JOIN projects AS p
            ON p."developerId" = d."id"
        LEFT JOIN projects_technologies AS pt
            ON pt."projectId" = p."id"
        LEFT JOIN technologies AS t
            ON t."id" = pt."technologyId"
        WHERE
            d."id" = $1
        ;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.developerId]
    }

    const queryResult: QueryResult<Project> = await client.query(queryConfig);
    const projectsList: Project[] = queryResult.rows;

    return res.status(200).json(projectsList);
};