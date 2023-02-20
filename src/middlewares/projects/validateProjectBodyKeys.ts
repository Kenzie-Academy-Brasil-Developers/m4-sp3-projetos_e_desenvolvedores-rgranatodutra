import { NextFunction, Request, Response } from "express";

export function validateProjectBodyKeys(req: Request, res: Response, next: NextFunction): Response | void {
    const requiredKeys: string[] = ["name", "description", "estimatedTime", "repository", "startDate", "developerId"];
    const expectedKeys: string[] = [...requiredKeys, "endDate"];
    const requestKeys: string[] = Object.keys(req.body);
    const missingKeys: string[] = requiredKeys.filter(key => !requestKeys.includes(key));
    const unexpectedKeys: string[] = requestKeys.filter(key => !expectedKeys.includes(key));

    unexpectedKeys.forEach(key => { delete req.body[key] });

    const isMethodPatch: boolean = req.method === "PATCH";
    const isBodyEmpty: boolean = requestKeys.filter(key => requiredKeys.includes(key)).length === 0;

    if (isBodyEmpty && isMethodPatch) return res.status(400).json({
        message: "At least one of those keys must be send.",
        keys: ["name", "description", "estimatedTime", "repository", "startDate", "endDate", "developerId"]
    });

    if (missingKeys.length && !isMethodPatch) {
        return res.status(400).json({
            message: `Missing required keys: ${missingKeys.join(', ')}`
        });
    };

    next();
};