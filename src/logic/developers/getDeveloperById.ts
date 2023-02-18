import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/client";
import { Developer } from "../../interfaces/developers";

export async function getDeveloperById(req: Request, res: Response): Promise<Response> {
    const queryString: string = `
        SELECT 
            d.*,
            di."developerSince",
            di."preferredOS"
        FROM 
            developers AS d
        LEFT JOIN developer_infos AS di
            ON di.id = d."developerInfoId"
        WHERE
            d.id = $1
        ;
        `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.developerId]
    };

    const queryResult: QueryResult<Developer> = await client.query(queryConfig);
    const developer: Developer = queryResult.rows[0];

    return res.status(200).json(developer);
};