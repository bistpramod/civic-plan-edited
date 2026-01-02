import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(
    `Error: ${err.message} | URL: ${req.originalUrl || "undefined"}`
  );

  if (!res || typeof res.status !== "function") {
    console.error(
      "⚠️ res.status is undefined. Ensure app is set up correctly."
    );
    return;
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default globalErrorHandler;
