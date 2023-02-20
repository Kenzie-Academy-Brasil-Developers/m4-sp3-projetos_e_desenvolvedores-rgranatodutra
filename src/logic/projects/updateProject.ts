import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database/client";
import { Project } from "../../interfaces/projects";

export async function updateProject(req: Request, res: Response): Promise<Response> {
    const queryTemplate: string = format(`
        UPDATE projects
        SET (%I) = ROW(%L)
        WHERE id = $1
        RETURNING *;
        `,
        Object.keys(req.body),
        Object.values(req.body)
    );

    const queryConfig: QueryConfig = {
        text: queryTemplate,
        values: [req.params.projectId]
    };

    const queryResult: QueryResult<Project> = await client.query(queryConfig);
    const responseObject: Project = queryResult.rows[0];

    return res.status(200).json(responseObject);
};