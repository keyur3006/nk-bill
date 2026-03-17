import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ✅ Custom Request Interface
export interface AuthRequest extends Request {
  user?: any;
}

// ✅ Authenticate Middleware
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized - Token Missing",
      });
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Invalid Token Format",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - Invalid Token",
    });
  }
};