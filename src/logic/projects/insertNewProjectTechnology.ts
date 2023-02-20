import { Request, Response } from "express";
import { Query, QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database/client";
import { ProjectTechnology, Technology } from "../../interfaces/technologies";
import { convertDateToPostgreFormat } from "../../scripts/convertDateToPostgreFormat";

export async function insertNewProjectTechnology(req: Request, res: Response): Promise<Response> {
    req.body.addedIn = convertDateToPostgreFormat(Date.now());

    const queryString: string = `
            INSERT INTO projects_technologies("addedIn", "projectId", "technologyId")
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.body.addedIn, req.params.projectId, req.technologyId]
    };

    const queryResult: QueryResult<ProjectTechnology> = await client.query(queryConfig);

    const technologyId: number = queryResult.rows[0].id;

    const responseQueryString: string = `
        SELECT 
            pt.*,
            p."id" AS "projectId",
            p."name" AS "projectName",
            p."description" AS "projectDescription",
            p."estimatedTime" AS "projectEstimatedTime",
            p."repository" AS "projectRepository",
            p."startDate" AS "projectStartDate",
            p."endDate" AS "projectEndDate",
            p."developerId" AS "projectDeveloperId"
        FROM 
            projects_technologies AS pt
        LEFT JOIN projects AS p
            ON p."id" = pt."projectId"
        WHERE 
            pt."id" = $1
        ;
    `;

    const responseQueryConfig: QueryConfig = {
        text: responseQueryString,
        values: [technologyId]
    };

    const responseQueryResult: QueryResult = await client.query(responseQueryConfig)

    return res.status(201).json(responseQueryResult.rows[0]);
};