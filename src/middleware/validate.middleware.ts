import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";

export function validate<T>(schema: ZodType<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                return next({
                    status: 400,
                    message: "Validation failed",
                    details: err.issues.map(e => ({
                        field: e.path.join("."),
                        message: e.message
                    }))
                })
            }
            next(err);
        }
    };
}