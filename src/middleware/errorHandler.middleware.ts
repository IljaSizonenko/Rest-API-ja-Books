import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
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
    if (typeof err === "object" && err !== null && "status" in err) {
        const custom = err as any;
        return res.status(custom.status).json({
            error: custom.message,
            details: custom.details ?? []
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