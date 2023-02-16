import { Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database/client";
export async function listDevelopers(req: Request, res: Response): Promise<Response | void> {

    const queryTemplate = `
        SELECT * 
        FROM developers 
        ;
        `;

    const queryResult: QueryResult<any> = await client.query(queryTemplate);

    return res.status(201).json(queryResult.rows);
};