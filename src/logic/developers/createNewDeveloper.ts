import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database/client";
import { Developer } from "../../interfaces/developers";

export async function createNewDeveloper(req: Request, res: Response): Promise<Response> {
    const queryTemplate: string = format(`
        INSERT INTO developers(%I)
        VALUES (%L)
        RETURNING *;
        `,
        Object.keys(req.body),
        Object.values(req.body)
    );

    const queryResult: QueryResult<Developer> = await client.query(queryTemplate);
    const responseObject: Developer = queryResult.rows[0];

    return res.status(201).json(responseObject);
};