import { NextFunction, Request, Response } from "express";
import * as EmailValidator from "email-validator";

export function validateDeveloperBody(req: Request, res: Response, next: NextFunction) {
    const requiredKeys: string[] = ["name", "email"];
    const requestKeys: string[] = Object.keys(req.body);
    const missingKeys: string[] = requiredKeys.filter(key => !requestKeys.includes(key));
    const unexpectedKeys: string[] = requestKeys.filter(key => !requiredKeys.includes(key));

    unexpectedKeys.forEach(key => { delete req.body[key] });
    const isMethodPatch: boolean = req.method === "PATCH";
    const isBodyEmpty: boolean = requestKeys.filter(key => requiredKeys.includes(key)).length === 0;

    if (isBodyEmpty) return res.status(400).json({
        message: "Request body is empty."
    });

    if (missingKeys.length && !isMethodPatch) {
        return res.status(400).json({
            message: `Missing required keys: ${missingKeys.join(', ')}`
        });
    };

    const validatedNameType: boolean = typeof req.body.name === "string";
    const validatedEmailType: boolean = EmailValidator.validate(req.body.email);

    if ((req.body.name && !validatedNameType) || (req.body.email && !validatedEmailType)) {
        let errors = [];
        !validatedNameType && errors.push("name.");
        !validatedEmailType && errors.push("email.");

        return res.status(400).json({
            message: `Invalid ${errors.join(" and ")}${errors.length > 1 ? " types" : " type"}`
        });
    };

    next();
};