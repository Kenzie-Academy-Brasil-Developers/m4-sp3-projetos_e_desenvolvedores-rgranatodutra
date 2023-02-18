import { Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../../database/client";
import { Developer } from "../../interfaces/developers";

export async function listDevelopers(req: Request, res: Response): Promise<Response> {
    const queryTemplate: string = `
        SELECT 
            d.*,
            di."developerSince",
            di."preferredOS"
        FROM 
            developers AS d
        LEFT JOIN developer_infos AS di
            ON di.id = d."developerInfoId"
        ;
        `;

    const queryResult: QueryResult<Developer> = await client.query(queryTemplate);
    const developersList: Developer[] = queryResult.rows;

    return res.status(200).json(developersList);
};