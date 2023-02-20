import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/client";
import { Developer } from "../../interfaces/developers";

export async function validateProjectDeveloperId(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { developerId } = req.body;

    const queryString: string = `
        SELECT * FROM 
            developers
        WHERE 
            id = $1
        ;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [developerId]
    };

    const queryResult: QueryResult<Developer> = await client.query(queryConfig);

    if (req.body.developerId && !queryResult.rows.length) {
        return res.status(404).json({
            message: "Developer not found."
        });
    }

    next();
};