import express from "express";
import { PrismaClient } from "@prisma/client";
import Razorpay from "razorpay";
import crypto from "crypto";

const router = express.Router();
const prisma = new PrismaClient();

/* ================= RAZORPAY INIT ================= */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/* ================= CREATE ORDER ================= */

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // ₹ to paise
      currency: "INR",
    });

    res.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* ================= VERIFY PAYMENT ================= */

router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      product,
      amount,
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET!;

    // 🔐 Signature verify
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment",
      });
    }

    // ✅ ORDER SAVE
    const order = await prisma.order.create({
      data: {
        userId,
        product,
        amount,
        paymentMethod: "ONLINE",
        status: "confirmed",
      },
    });

    // ✅ PAYMENT SAVE
    await prisma.payment.create({
      data: {
        userId,
        orderId: order.id,
        amount,
        method: "ONLINE",
        status: "paid",
      },
    });

    res.json({
      success: true,
      message: "Payment verified & saved",
    });
  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({
      message: "Verification failed",
    });
  }
});

export default router;
