import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/client";
import { Developer } from "../../interfaces/developers";

export async function verifyDeveloperInfoExist(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.developerId;
    const method: string = req.method;

    const queryString: string = `
        SELECT ("developerInfoId") FROM 
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
    const developerInfoId: number | null = queryResult.rows[0].developerInfoId;

    if (method === "POST" && developerInfoId) return res.status(409).json({
        message: "Developer infos already exist, try PATCH method instead."
    });

    if (method === "PATCH" && !developerInfoId) return res.status(409).json({
        message: "Developer infos doesn't exist, try POST method instead."
    });

    if (method === "PATCH" && developerInfoId) req.developerInfoId = developerInfoId;

    next();
};