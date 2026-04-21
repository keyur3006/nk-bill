import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ✅ Custom Request Interface
export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No header
    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized - Token Missing",
      });
    }

    // ❌ Invalid format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized - Invalid Format",
      });
    }

    const token = authHeader.split(" ")[1];

    // ❌ Token missing
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Token Missing",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: number; email: string };

    // ❌ Safety check
    if (!decoded.id) {
      return res.status(401).json({
        message: "Unauthorized - Invalid Token Data",
      });
    }

    // ✅ Attach user
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    // 🔍 Debug (optional)
    console.log("AUTH USER 👉", req.user);

    next();
  } catch (error) {
    console.log("AUTH ERROR 👉", error);
    return res.status(401).json({
      message: "Unauthorized - Invalid Token",
    });
  }
};