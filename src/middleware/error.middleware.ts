import { Prisma } from "../generated/prisma/client";
import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error:", err);
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({
        status: 404,
        message: "Record not found",
        details: err.meta,
      });
    }
  }
  if (err.status === 404) {
    return res.status(404).json({
      status: 404,
      message: err.message || "Not found",
      details: err.details || [],
    });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      status: 400,
      message: "Database error",
      code: err.code,
      details: err.meta,
    });
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      status: 400,
      message: "Validation error",
      details: err.message,
    });
  }
  return res.status(500).json({
    status: 500,
    message: "Internal server error",
    details: err.message || err,
  });
}