import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/stats", async (req, res) => {
  try {

    const totalCustomers = await prisma.customer.count();

    const bills = await prisma.bill.findMany();

    const totalRevenue = bills.reduce(
      (sum, bill) => sum + bill.totalAmount,
      0
    );

    const pendingPayments = bills
      .filter((bill) => bill.status === "PENDING")
      .reduce((sum, bill) => sum + bill.totalAmount, 0);

    const bottlesDelivered = bills.reduce(
      (sum, bill) => sum + bill.totalBottles,
      0
    );

    res.json({
      totalCustomers,
      bottlesDelivered,
      totalRevenue,
      pendingPayments,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;