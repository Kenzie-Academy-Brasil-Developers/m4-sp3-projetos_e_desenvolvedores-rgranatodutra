import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/client";

export async function getDeveloperById(req: Request, res: Response): Promise<Response | void> {
    const queryString = `
        SELECT * 
        FROM developers
        WHERE
         id = $1 
        ;
        `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.developerId]
    };

    const queryResult: QueryResult<any> = await client.query(queryConfig);

    return res.status(201).json(queryResult.rows);
};