import { authenticate, AuthRequest } from "../middleware/auth.middleware";
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/* ================= CREATE ORDER ================= */

router.post(
  "/",
  authenticate,
  async (req: AuthRequest, res) => {
    try {
      const { product, amount, paymentMethod } = req.body;

      const userId = req.user?.id;

      const order = await prisma.order.create({
        data: {
          userId: Number(userId),
          product,
          amount,
          paymentMethod,
          status: "pending",
        },
      });

      res.json(order);
    } catch (error) {
      console.error("Create Order Error:", error);

      res.status(500).json({
        message: "Failed to create order",
      });
    }
  }
);

/* ================= MY ORDERS ================= */

router.get(
  "/my-orders",
  authenticate,
  async (req: AuthRequest, res) => {
    try {
      const userId = req.user?.id;

      const orders = await prisma.order.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          payments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(orders);
    } catch (error) {
      console.error("Fetch Orders Error:", error);

      res.status(500).json({
        message: "Failed to fetch orders",
      });
    }
  }
);

/* ================= ALL ORDERS ================= */

router.get("/all", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        payments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

export default router;