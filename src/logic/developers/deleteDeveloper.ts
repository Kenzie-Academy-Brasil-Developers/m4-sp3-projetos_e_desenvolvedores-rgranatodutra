import { Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../../database/client";
import { Developer } from "../../interfaces/developers";

export async function deleteDeveloper(req: Request, res: Response): Promise<Response> {
    const id = req.params.developerId;
    const queryTemplate: string = `
        DELETE FROM developers
        WHERE id = $1
        RETURNING *;
    `;

    const queryResult: QueryResult<Developer> = await client.query(queryTemplate, [id]);
    const responseObject: Developer = queryResult.rows[0];

    return res.status(204).json(responseObject);
};