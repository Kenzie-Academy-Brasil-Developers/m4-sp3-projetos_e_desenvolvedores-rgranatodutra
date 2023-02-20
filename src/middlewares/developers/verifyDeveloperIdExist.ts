import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/client";
import { Developer } from "../../interfaces/developers";

export async function verifyDeveloperIdExist(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.developerId);

    const queryString: string = `
        SELECT * FROM 
            developers 
        WHERE 
            id = $1
        ;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    };

    const queryResult: QueryResult<Developer> = await client.query(queryConfig);

    if (!queryResult.rows.length) {
        return res.status(404).json({
            message: "Developer not found."
        });
    };

    next();
};