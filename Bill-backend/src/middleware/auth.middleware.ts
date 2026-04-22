import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string; // 🔥 ADD THIS
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized - Token Missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: number;
      email: string;
      role: string; // 🔥 ADD THIS
    };

    // ✅ Attach user (FINAL)
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role, // 🔥 IMPORTANT
    };

    console.log("AUTH USER 👉", req.user); // debug

    next();
  } catch (error) {
    console.log("AUTH ERROR 👉", error);
    return res.status(401).json({
      message: "Unauthorized - Invalid Token",
    });
  }
};