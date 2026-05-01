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

export default router;