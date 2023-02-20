import { NextFunction, Request, Response } from "express";
import { convertDateToPostgreFormat } from "../../scripts/convertDateToPostgreFormat";

export function validateProjectBodyValues(req: Request, res: Response, next: NextFunction): Response | void {
    const {
        name,
        description,
        estimatedTime,
        repository,
        startDate,
        endDate,
        developerId
    } = req.body;

    const validatedName: boolean =
        !name ||
        (
            typeof name === "string" &&
            name.length > 0 &&
            name.length <= 50
        );

    const validatedDescription: boolean =
        !description ||
        (
            typeof description === "string" &&
            description.length > 0
        );

    const validatedEstimatedTime: boolean =
        !estimatedTime ||
        (
            typeof estimatedTime === "string" &&
            estimatedTime.length > 0 &&
            estimatedTime.length <= 20
        );

    const validatedRepository: boolean =
        !repository ||
        (
            typeof repository === "string" &&
            estimatedTime.length > 0 &&
            estimatedTime.length <= 120
        );

    const validatedStartDate: boolean =
        !startDate ||
        (
            typeof startDate === "string" &&
            !isNaN(new Date(startDate).getTime())
        );

    const validatedEndDate: boolean =
        !endDate ||
        (
            typeof endDate === "string" &&
            !isNaN(new Date(endDate).getTime())
        );

    const validatedDeveloperId: boolean =
        !developerId ||
        typeof developerId === "number";

    const keysValidationStatus = {
        name: validatedName,
        description: validatedDescription,
        estimatedTime: validatedEstimatedTime,
        repository: validatedRepository,
        startDate: validatedStartDate,
        endDate: validatedEndDate,
        developerId: validatedDeveloperId
    };

    const keysValidationStatusArr = Object.entries(keysValidationStatus);
    const invalidKeysArr = keysValidationStatusArr.filter(arr => arr.includes(false));

    if (invalidKeysArr.length) {
        const invalidKeys = invalidKeysArr.map(arr => arr[0]);
        return res.status(400).json({
            message: "There is invalid key value(s) in requisition's body.",
            invalidKeys
        });
    };

    if (req.body.startDate) req.body.startDate = convertDateToPostgreFormat(req.body.startDate);
    if (req.body.endDate) req.body.endDate = convertDateToPostgreFormat(req.body.endDate);

    next();
};