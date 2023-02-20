import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/client";
import { ProjectTechnology, Technology } from "../../interfaces/technologies";

export async function verifyRelationshipExist(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const searchTechnologyNameQueryString: string = `
        SELECT * FROM technologies
        WHERE name = $1
    `;

    const searchTechnologyNameQueryConfig: QueryConfig = {
        text: searchTechnologyNameQueryString,
        values: [req.params.technologyName]
    };

    const searchTechnologyNameQueryResult: QueryResult<Technology> = await client.query(searchTechnologyNameQueryConfig);

    const searchTechnologyName: boolean = searchTechnologyNameQueryResult.rows.length > 0;


    if (!searchTechnologyName) return res.status(404).json({
        message: "Technology not supported",
        options: [
            "JavaScript",
            "Python",
            "React",
            "Express.js",
            "HTML",
            "CSS",
            "Django",
            "PostgreSQL",
            "MongoDB"
        ]
    });


    const searchRelationshipQueryString: string = `
        SELECT * FROM projects_technologies
        WHERE
            "projectId" = $1 AND
            "technologyId" = $2;
    `;

    const searchRelationshipQueryConfig: QueryConfig = {
        text: searchRelationshipQueryString,
        values: [req.params.projectId, searchTechnologyNameQueryResult.rows[0].id]
    };

    const searchRelationshipQueryResult: QueryResult<ProjectTechnology> = await client.query(searchRelationshipQueryConfig);
    const findRelationship: boolean = searchRelationshipQueryResult.rows.length > 0;

    if (!findRelationship) return res.status(404).json({
        message: `Technology '${req.params.technologyName}' not found on this Project.`
    });

    const findRelationshipId = searchRelationshipQueryResult.rows[0].id;

    req.relationshipId = findRelationshipId;

    next();
};