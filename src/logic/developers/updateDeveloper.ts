import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database/client";
import { Developer } from "../../interfaces/developers";

export async function updateDeveloper(req: Request, res: Response): Promise<Response> {
    const queryTemplate: string = format(
        `
        UPDATE developers
        SET (%I) = ROW (%L)
        WHERE id = $1
        RETURNING *;
        `,
        Object.keys(req.body),
        Object.values(req.body)
    );

    const queryConfig: QueryConfig = {
        text: queryTemplate,
        values: [req.params.developerId]
    };

    const queryResult: QueryResult<Developer> = await client.query(queryConfig);
    const responseObject: Developer = queryResult.rows[0];

    return res.status(201).json(responseObject);
};