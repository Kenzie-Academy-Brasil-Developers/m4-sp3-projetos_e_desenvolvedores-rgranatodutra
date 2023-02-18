import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database/client";
import { DeveloperInfo } from "../../interfaces/developers";

export async function insertNewDeveloperInfo(req: Request, res: Response): Promise<Response> {
    const queryTemplate: string = format(`
            INSERT INTO developer_infos(%I)
            VALUES (%L)
            RETURNING *;
        `,
        Object.keys(req.body),
        Object.values(req.body)
    );
    const queryResult: QueryResult<DeveloperInfo> = await client.query(queryTemplate);

    const developerInfo: DeveloperInfo = queryResult.rows[0];

    const queryString: string = `
        UPDATE developers
        SET "developerInfoId" = $1
        WHERE "id" = $2
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [developerInfo.id, req.params.developerId]
    };

    await client.query(queryConfig);

    return res.status(201).json(developerInfo);
};