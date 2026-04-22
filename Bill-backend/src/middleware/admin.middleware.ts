import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 🔍 Debug (optional)
    console.log("CHECK ROLE 👉", req.user);

    // ❌ If not admin
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access Denied - Admin Only",
      });
    }

    // ✅ Admin allowed
    next();
  } catch (error) {
    console.log("ADMIN MIDDLEWARE ERROR 👉", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
