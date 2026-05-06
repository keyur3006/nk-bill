import express from "express";
import { PrismaClient } from "@prisma/client";

import {
  authenticate,
  AuthRequest,
} from "../middleware/auth.middleware";

const router = express.Router();

const prisma = new PrismaClient();

/* ================= GET PROFILE ================= */

router.get(
  "/me",
  authenticate,
  async (req: AuthRequest, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(req.user?.id),
        },
      });

      res.json(user);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch profile",
      });
    }
  }
);

/* ================= UPDATE PROFILE ================= */

router.put(
  "/update",
  authenticate,
  async (req: AuthRequest, res) => {
    try {
      const {
        name,
        mobile,
        address,
        city,
        pincode,
      } = req.body;

      const updatedUser =
        await prisma.user.update({
          where: {
            id: Number(req.user?.id),
          },

          data: {
            name,
            mobile,
            address,
            city,
            pincode,
          },
        });

      res.json(updatedUser);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Profile update failed",
      });
    }
  }
);

export default router;