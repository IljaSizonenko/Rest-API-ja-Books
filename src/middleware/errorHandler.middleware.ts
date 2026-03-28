import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: "Validation failed",
            details: err.issues.map(e => ({
                field: e.path.length ? e.path.join("."): null,
                message: e.message
            }))
        });
    }
    if (err instanceof Error) {
        return res.status(500).json({
            error: err.message,
            details: []
        });
    }
    return res.status(500).json({
        error: "Unknown error occurred",
        details: []
    });
}