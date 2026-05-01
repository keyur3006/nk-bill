import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Create Payment
router.post("/", async (req, res) => {
  try {
    const { userId, orderId, amount, method } = req.body;

    if (!userId || !orderId || !amount || !method) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const payment = await prisma.payment.create({
      data: {
        userId,
        orderId,
        amount,
        method,
        status: method === "ONLINE" ? "paid" : "pending",
      },
    });

    // 🔥 Auto confirm order
    if (method === "ONLINE") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "confirmed" },
      });
    }

    res.json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;