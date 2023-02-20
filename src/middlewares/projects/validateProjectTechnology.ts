import { NextFunction, Request, Response } from "express";

export function validateProjectTechnology(req: Request, res: Response, next: NextFunction): Response | void {
    if (!req.body.name) return res.status(400).json({
        message: "Missing required key: name."
    });

    const options: string[] = [
        "JavaScript",
        "Python",
        "React",
        "Express.js",
        "HTML",
        "CSS",
        "Django",
        "PostgreSQL",
        "MongoDB"
    ];

    if (!options.includes(req.body.name)) return res.status(400).json({
        message: "Technology not supported.",
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

    next();
};