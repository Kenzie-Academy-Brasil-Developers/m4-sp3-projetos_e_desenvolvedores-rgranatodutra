import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database/client";
import { Project } from "../../interfaces/projects";

export async function createNewProject(req: Request, res: Response): Promise<Response> {
    const queryTemplate: string = format(`
        INSERT INTO projects(%I)
        VALUES (%L)
        RETURNING *;
        `,
        Object.keys(req.body),
        Object.values(req.body)
    );

    const queryResult: QueryResult<Project> = await client.query(queryTemplate);
    const responseObject: Project = queryResult.rows[0];

    return res.status(201).json(responseObject);
};