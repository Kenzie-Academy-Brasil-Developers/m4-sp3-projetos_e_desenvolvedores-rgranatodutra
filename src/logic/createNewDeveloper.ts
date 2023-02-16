import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database/client";

export async function createNewDeveloper(req: Request, res: Response): Promise<Response | void> {

    const queryTemplate = format(`
        INSERT INTO developers(%I)
        VALUES (%L)
        RETURNING *;
        `,
        Object.keys(req.body),
        Object.values(req.body)
    );

    const queryResult: QueryResult<any> = await client.query(queryTemplate);
    const test: any = queryResult.rows[0];

    return res.status(201).json(test);
};