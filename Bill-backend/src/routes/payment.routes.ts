import express from "express";
import { PrismaClient } from "@prisma/client";
import Razorpay from "razorpay";
import crypto from "crypto";

import {
  authenticate,
  AuthRequest,
} from "../middleware/auth.middleware";

const router = express.Router();
const prisma = new PrismaClient();

/* ================= RAZORPAY INIT ================= */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/* ================= CREATE ORDER ================= */

router.post(
  "/create-order",
  authenticate,
  async (req: AuthRequest, res) => {
    try {
      const { amount } = req.body;

      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
      });

      res.json(order);
    } catch (error) {
      console.error(
        "Razorpay Order Error:",
        error
      );

      res.status(500).json({
        message: "Order creation failed",
      });
    }
  }
);

/* ================= VERIFY PAYMENT ================= */

router.post(
  "/verify",
  authenticate,
  async (req: AuthRequest, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        product,
        amount,
        quantity,
      } = req.body;

      // ✅ User from token
      const userId = req.user?.id;

      const secret =
        process.env.RAZORPAY_KEY_SECRET!;

      // 🔐 Verify signature
      const generatedSignature = crypto
        .createHmac("sha256", secret)
        .update(
          razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

      if (
        generatedSignature !==
        razorpay_signature
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid payment",
        });
      }

      // ✅ Save order
      const order = await prisma.order.create({
        data: {
          userId: Number(userId),
          product,
          amount,
          quantity,
          paymentMethod: "ONLINE",
          status: "confirmed",
        },
      });

      // ✅ Save payment
      await prisma.payment.create({
        data: {
          userId: Number(userId),
          orderId: order.id,
          amount,
          method: "ONLINE",
          status: "paid",
        },
      });

      res.json({
        success: true,
        message:
          "Payment verified & saved",
      });
    } catch (error) {
      console.error("Verify Error:", error);

      res.status(500).json({
        message: "Verification failed",
      });
    }
  }
);

export default router;