import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/client";

export async function verifyEmailExists(req: Request, res: Response, next: NextFunction) {
    const email: string = req.body.email;

    const queryString: string = `
        SELECT * FROM 
            developers 
        WHERE 
            email = $1
        ;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email]
    };

    const queryResult: QueryResult<any> = await client.query(queryConfig);

    if (queryResult.rows.length) {
        return res.status(409).json({
            message: "Email already exists."
        });
    };

    next();
};