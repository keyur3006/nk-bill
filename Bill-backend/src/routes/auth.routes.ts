import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { sendOtpMail } from "../utils/sendMail";

const router = Router();

const prisma = new PrismaClient();

/* ================= REGISTER ================= */

router.post(
  "/register",

  async (req: Request, res: Response) => {
    try {
      const { email, password } =
        req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,

          message:
            "Email and password are required",
        });
      }

      const existingUser =
        await prisma.user.findUnique({
          where: { email },
        });

      if (existingUser) {
        return res.status(400).json({
          success: false,

          message:
            "User already exists",
        });
      }

      // ✅ OTP Generate

      const otp = Math.floor(
        100000 +
          Math.random() * 900000
      ).toString();

      // ✅ Hash Password

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // ✅ Create User

      const user =
        await prisma.user.create({
          data: {
            email,

            password:
              hashedPassword,

            role: "KARIGAR",

            otp,

            otpExpiry: new Date(
              Date.now() +
                5 * 60 * 1000
            ),

            isVerified: false,
          },
        });

      // ✅ Send OTP Email

      await sendOtpMail(
        email,
        otp
      );

      res.status(201).json({
        success: true,

        message:
          "OTP sent to your email",

        user: {
          id: user.id,

          email: user.email,

          role: user.role,
        },
      });
    } catch (error) {
      console.error(
        "Register Error:",
        error
      );

      res.status(500).json({
        success: false,

        message: "Server error",
      });
    }
  }
);

/* ================= LOGIN ================= */

router.post(
  "/login",

  async (req: Request, res: Response) => {
    try {
      const { email, password } =
        req.body;

      // ✅ Validation

      if (!email || !password) {
        return res.status(400).json({
          success: false,

          message:
            "Email and password are required",
        });
      }

      // ✅ Find User

      const user =
        await prisma.user.findUnique({
          where: { email },
        });

      if (!user || !user.password) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid email or password",
        });
      }

      // ✅ OTP Verify Check

      if (!user.isVerified) {
        return res.status(400).json({
          success: false,

          message:
            "Please verify OTP first",
        });
      }

      // ✅ Compare Password

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid email or password",
        });
      }

      // ✅ JWT Secret

      const secret =
        process.env.JWT_SECRET;

      if (!secret) {
        throw new Error(
          "JWT_SECRET not found"
        );
      }

      // ✅ Generate Token

      const token = jwt.sign(
        {
          id: user.id,

          email: user.email,

          role: user.role,
        },

        secret,

        {
          expiresIn: "1d",
        }
      );

      // ✅ Response

      res.json({
        success: true,

        message:
          "Login successful",

        token,

        user: {
          id: user.id,

          email: user.email,

          role: user.role,
        },
      });
    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      res.status(500).json({
        success: false,

        message: "Server error",
      });
    }
  }
);

/* ================= VERIFY OTP ================= */

router.post(
  "/verify-otp",

  async (req, res) => {
    try {
      const { email, otp } =
        req.body;

      const user =
        await prisma.user.findUnique({
          where: { email },
        });

      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User not found",
        });
      }

      if (user.otp !== otp) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid OTP",
        });
      }

      // ✅ Verify User

      await prisma.user.update({
        where: { email },

        data: {
          isVerified: true,

          otp: null,

          otpExpiry: null,
        },
      });

      res.json({
        success: true,

        message:
          "OTP verified successfully",
      });
    } catch (error) {
      console.error(
        "OTP Verify Error:",
        error
      );

      res.status(500).json({
        success: false,

        message: "Server error",
      });
    }
  }
);

/* ================= ALL USERS ================= */

router.get(
  "/all-users",

  async (req, res) => {
    try {
      const users =
        await prisma.user.findMany();

      res.json(users);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed",
      });
    }
  }
);

router.delete("/delete-user/:id", async (req, res) => {
  try {

    const userId = Number(req.params.id);

    // DELETE RELATED TABLE DATA

    await prisma.payment.deleteMany({
      where: {
        userId,
      },
    });

    await prisma.order.deleteMany({
      where: {
        userId,
      },
    });

    await prisma.bill.deleteMany({
      where: {
        userId,
      },
    });

    await prisma.delivery.deleteMany({
      where: {
        userId,
      },
    });

    // NOW DELETE USER

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Delete failed",
    });
  }
});

export default router;