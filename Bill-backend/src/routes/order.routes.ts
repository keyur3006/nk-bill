import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Create Order
router.post("/", async (req, res) => {
  const { userId, product, amount, paymentMethod } = req.body;

  const order = await prisma.order.create({
    data: {
      userId,
      product,
      amount,
      paymentMethod,
      status: paymentMethod === "COD" ? "pending" : "pending",
    },
  });

  res.json(order);
});
router.get("/my-orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
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
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});
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
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});
export default router;