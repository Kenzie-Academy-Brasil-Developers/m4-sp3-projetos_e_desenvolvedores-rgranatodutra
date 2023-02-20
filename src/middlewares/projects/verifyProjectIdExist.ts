import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/client";
import { Project } from "../../interfaces/projects";

export async function verifyProjectIdExist(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const id: number = parseInt(req.params.projectId);

    const queryString: string = `
        SELECT * FROM 
            projects 
        WHERE 
            id = $1
        ;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    };

    const queryResult: QueryResult<Project> = await client.query(queryConfig);

    if (!queryResult.rows.length) {
        return res.status(404).json({
            message: "Project not found."
        });
    };

    next();
}