import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const router = express.Router();
const prisma = new PrismaClient();

/* ================= TEST ROUTE ================= */

router.get("/test", authenticate, isAdmin, (req, res) => {
  res.json({ message: "Admin route working ✅" });
});

/* ================= CREATE KARIGAR ================= */

router.post("/create-karigar", authenticate, isAdmin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ✅ Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create Karigar
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "KARIGAR", // 🔥 IMPORTANT
      },
    });

    res.status(201).json({
      success: true,
      message: "Karigar created successfully ✅",
      user,
    });
  } catch (error) {
    console.error("Create Karigar Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ================= GET ALL KARIGARS ================= */

router.get("/karigars", authenticate, isAdmin, async (req, res) => {
  try {
    const karigars = await prisma.user.findMany({
      where: {
        role: "KARIGAR",
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    res.json({
      success: true,
      data: karigars,
    });
  } catch (error) {
    console.error("Fetch Karigars Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ================= DELETE KARIGAR ================= */

router.delete("/karigar/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      success: true,
      message: "Karigar deleted successfully 🗑️",
    });
  } catch (error) {
    console.error("Delete Karigar Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;