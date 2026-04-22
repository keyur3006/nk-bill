import { Router, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();
const prisma = new PrismaClient();

// ✅ ONLY ADMIN CAN CREATE USER
router.post("/create-user", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "KARIGAR"
      }
    });

    res.json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

export default router;