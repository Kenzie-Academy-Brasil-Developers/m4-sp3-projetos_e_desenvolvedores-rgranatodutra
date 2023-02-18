import { NextFunction, Request, Response } from "express";

export function validateDeveloperInfoBody(req: Request, res: Response, next: NextFunction) {
    const requiredKeys: string[] = ["developerSince", "preferredOS"];
    const requestKeys: string[] = Object.keys(req.body);
    const missingKeys: string[] = requiredKeys.filter(key => !requestKeys.includes(key));
    const unexpectedKeys: string[] = requestKeys.filter(key => !requiredKeys.includes(key));

    unexpectedKeys.forEach(key => { delete req.body[key] });

    if (missingKeys.length) {
        return res.status(400).json({
            message: `Missing required keys: ${missingKeys.join(', ')}`
        });
    };

    const validatedDeveloperSince: boolean = typeof req.body.developerSince === "string";
    const validatedPreferredOS: boolean = ["Windows", "Linux", "macOS"].includes(req.body.preferredOS);

    if (!validatedDeveloperSince || !validatedPreferredOS) {
        let errors = [];
        !validatedDeveloperSince && errors.push("name.");
        !validatedPreferredOS && errors.push("email.");

        return res.status(400).json({
            message: `Invalid ${errors.join(' and ')}${errors.length > 1 ? " values" : " value"}`
        });
    };

    next();
};