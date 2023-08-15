// src/middleware/requestValidator.ts
import { Request, Response, NextFunction } from "express";

export function RequestValidator(requiredFields: string[]) {
  return function (req: Request, res: Response, next: NextFunction): void {
    const missingFields: string[] = [];

    for (const field of requiredFields) {
      if (!req.body.hasOwnProperty(field)) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      throw new Error(`Missing fields: ${missingFields.join(", ")}`);
    }

    next(); // Ensure we call next() to pass control to the next middleware or route handler
  };
}
