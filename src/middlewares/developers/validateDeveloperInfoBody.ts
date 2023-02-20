import { NextFunction, Request, Response } from "express";
import { convertDateToPostgreFormat } from "../../scripts/convertDateToPostgreFormat";

export function validateDeveloperInfoBody(req: Request, res: Response, next: NextFunction) {
    const method: string = req.method;
    const requiredKeys: string[] = ["developerSince", "preferredOS"];
    const requestKeys: string[] = Object.keys(req.body);

    const unexpectedKeys: string[] = requestKeys.filter(key => !requiredKeys.includes(key));
    unexpectedKeys.forEach(key => { delete req.body[key] });

    const missingKeys: string[] = requiredKeys.filter(key => !requestKeys.includes(key));
    if (method === "POST" && missingKeys.length) {
        return res.status(400).json({
            message: `Missing required keys: ${missingKeys.join(', ')}`
        });
    };

    const validatedKeys: number = requestKeys.filter(key => requiredKeys.includes(key)).length;
    if (method === "PATCH" && !validatedKeys) return res.status(400).json({
        message: "At least one of those keys must be send.",
        keys: ["developerSince", "preferredOS"]
    });

    const validatedDeveloperSince: boolean = typeof req.body.developerSince === "string";
    const validatedPreferredOS: boolean = ["Windows", "Linux", "macOS"].includes(req.body.preferredOS);

    let errors = [];

    if (req.body.developerSince && !validatedDeveloperSince) {
        errors.push({
            message: "Invalid developerSince value.",
            options: ["date string"]
        });
    };

    if (req.body.preferredOS && !validatedPreferredOS) {
        errors.push({
            message: "Invalid OS option.",
            options: ["Windows", "Linux", "macOS"]
        });
    };

    if (errors.length > 0) return res.status(400).json(errors);

    const hasDeveloperSince: boolean = requestKeys.includes("developerSince");
    if (hasDeveloperSince) req.body.developerSince = convertDateToPostgreFormat(req.body.developerSince);

    next();
};