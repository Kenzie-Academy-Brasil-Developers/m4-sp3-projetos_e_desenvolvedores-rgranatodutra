import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/client";
import { ProjectTechnology, Technology } from "../../interfaces/technologies";

export async function verifyDuplicatedTechnology(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const findTechnologyQueryString: string = `
        SELECT * FROM technologies
        WHERE name = $1
    `;

    const findTechnologyQueryConfig: QueryConfig = {
        text: findTechnologyQueryString,
        values: [req.body.name]
    }

    const findTechnologyQueryResult: QueryResult<Technology> = await client.query(findTechnologyQueryConfig);

    const findTechnologyId: number = findTechnologyQueryResult.rows[0].id;

    req.technologyId = findTechnologyId;

    const selectQueryString: string = `
        SELECT * FROM projects_technologies
        WHERE 
        "projectId" = $1 AND
        "technologyId" = $2;
    `;

    const selectQueryConfig: QueryConfig = {
        text: selectQueryString,
        values: [req.params.projectId, findTechnologyId]
    };

    const selectQueryResult: QueryResult<ProjectTechnology> = await client.query(selectQueryConfig);

    const isTechnologyDuplicated: boolean = selectQueryResult.rows.length > 0;

    if (isTechnologyDuplicated) return res.status(409).json({
        message: "You already added this technology in your project."
    });

    next();
};