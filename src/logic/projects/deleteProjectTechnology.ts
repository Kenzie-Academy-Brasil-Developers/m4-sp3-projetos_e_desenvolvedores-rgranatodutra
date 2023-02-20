import { Request, Response } from "express";
import { client } from "../../database/client";

export async function deleteProjectTechnology(req: Request, res: Response): Promise<Response> {
    const id = req.relationshipId;
    const queryTemplate: string = `
        DELETE FROM projects_technologies
        WHERE id = $1;
    `;

    await client.query(queryTemplate, [id])

    return res.status(204).send();
};