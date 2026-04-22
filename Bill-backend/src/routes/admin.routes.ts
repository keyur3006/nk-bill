import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const router = express.Router();
const prisma = new PrismaClient();

/* ✅ TEST */
router.get("/test", authenticate, isAdmin, (req, res) => {
  res.json({ message: "Admin route working ✅" });
});

/* ✅ CREATE KARIGAR */
router.post("/create-user", authenticate, isAdmin, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // check existing
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "KARIGAR", // 🔥 IMPORTANT
      },
    });

    res.json({
      success: true,
      message: "Karigar created successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;