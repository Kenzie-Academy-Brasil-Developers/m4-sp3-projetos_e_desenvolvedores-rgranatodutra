import { Request, Response } from "express";
import { client } from "../../database/client";


export async function deleteProject(req: Request, res: Response): Promise<Response> {
    const id = req.params.projectId;
    const queryTemplate: string = `
        DELETE FROM projects
        WHERE id = $1;
    `;

    await client.query(queryTemplate, [id])

    return res.status(204).send();
};