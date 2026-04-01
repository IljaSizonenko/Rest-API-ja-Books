import { Prisma } from "../src/generated/prisma/client";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error:", err);
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      details: err.issues,
    });
  }
  if (err.status === 404 || err.statusCode === 404) {
    return res.status(404).json({
      success: false,
      error: err.message || "Not found",
    });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        error: "Record not found",
        details: err.meta,
      });
    }
    if (err.code === "P2002") {
      return res.status(400).json({
        success: false,
        error: "Unique constraint failed",
        details: err.meta,
      });
    }
    if (err.code === "P2003") {
      return res.status(400).json({
        success: false,
        error: "Foreign key constraint failed",
        details: err.meta,
      });
    }
    return res.status(400).json({
      success: false,
      error: "Database error",
      code: err.code,
      details: err.meta,
    });
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      error: "Prisma validation error",
      details: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    error: "Internal server error",
    details: err.message || err,
  });
}