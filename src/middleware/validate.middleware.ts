import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod"

export function validate(schema: ZodType<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            next(err);
        }
    };
}