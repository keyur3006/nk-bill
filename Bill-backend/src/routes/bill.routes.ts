import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

import fs from "fs";
import path from "path";
import jsPDF from "jspdf";

const router = Router();
const prisma = new PrismaClient();
/* ===========================
   GET GENERATED BILLS
=========================== */
router.get("/generated-bills", authenticate, async (req: AuthRequest, res) => {
  try {
    const bills = await prisma.bill.findMany({
      include: { customer: true },
      orderBy: { id: "desc" }
    });

    res.json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching generated bills" });
  }
});
/* ===========================
   CREATE BILL + GENERATE PDF
=========================== */
router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const { customerId, month, year, bottleName, bottlePrice, quantityPerDay } = req.body;

    if (!customerId || !month || !year || !bottleName || !bottlePrice || !quantityPerDay) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check customer
    const customer = await prisma.customer.findUnique({
      where: { id: customerId }
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check user
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id }
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid user. Please login again."
      });
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    const totalBottles = quantityPerDay * daysInMonth;
    const totalAmount = totalBottles * bottlePrice;

    /* ===========================
       GENERATE PDF
    =========================== */

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("NR FOODS", 90, 20);

    doc.setFontSize(14);
    doc.text("BILL INVOICE", 85, 30);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`Customer: ${customer.name}`, 20, 50);
    doc.text(`Billing Period: ${month}/${year}`, 20, 60);
    doc.text(`Daily Quantity: ${quantityPerDay}`, 20, 70);
    doc.text(`Total Bottles: ${totalBottles}`, 20, 80);

    // Table header
    doc.setFont("helvetica", "bold");

    doc.text("Bottle", 20, 100);
    doc.text("Qty", 80, 100);
    doc.text("Price", 120, 100);
    doc.text("Total", 160, 100);

    doc.line(20, 103, 190, 103);

    // Table row
    doc.setFont("helvetica", "normal");

    doc.text(bottleName, 20, 115);
    doc.text(String(totalBottles), 80, 115);
    doc.text(`Rs. ${bottlePrice}`, 120, 115);
    doc.text(`Rs. ${totalAmount}`, 160, 115);

    // Grand total
    doc.line(120, 130, 190, 130);

    doc.setFont("helvetica", "bold");
    doc.text(`Grand Total: Rs. ${totalAmount}`, 120, 140);

    // Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for your business!", 75, 180);

    /* ===========================
       SAVE PDF FILE
    =========================== */

    const pdfDir = path.join(process.cwd(), "public/pdfs");

    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    const pdfFileName = `bill_${customerId}_${month}_${year}.pdf`;
    const pdfPath = path.join(pdfDir, pdfFileName);

    const pdfBuffer = doc.output("arraybuffer");
    fs.writeFileSync(pdfPath, Buffer.from(pdfBuffer));

    /* ===========================
       SAVE BILL IN DATABASE
    =========================== */

    const bill = await prisma.bill.create({
      data: {
        month,
        year,
        bottleName,
        bottlePrice,
        quantityPerDay,
        totalBottles,
        totalAmount,
        pdfUrl: `/pdfs/${pdfFileName}`,
        customer: {
          connect: { id: customerId }
        },
        user: {
          connect: { id: req.user!.id }
        }
      }
    });

    res.status(201).json({
      message: "Bill created successfully",
      bill
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   GET ALL BILLS
=========================== */
router.get("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const bills = await prisma.bill.findMany({
      include: { customer: true },
      orderBy: { id: "desc" }
    });

    res.json(bills);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   UPDATE PAYMENT STATUS
=========================== */
router.patch("/:id/status", authenticate, async (req: AuthRequest, res) => {
  try {
    const billId = Number(req.params.id);
    const { status } = req.body;

    const updatedBill = await prisma.bill.update({
      where: { id: billId },
      data: { status }
    });

    res.json({
      message: "Payment status updated successfully",
      bill: updatedBill
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   DELETE BILL
=========================== */
router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.bill.delete({
      where: { id }
    });

    res.json({ message: "Bill deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting bill" });
  }
});

/* ===========================
   VIEW PDF
=========================== */
router.get("/:id/pdf", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const bill = await prisma.bill.findUnique({
      where: { id }
    });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    if (!bill.pdfUrl) {
      return res.status(404).json({ message: "PDF not available" });
    }

   const pdfPath = path.join(process.cwd(), "src/public/pdfs", path.basename(bill.pdfUrl));
    res.sendFile(pdfPath);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error loading PDF" });
  }
});



export default router;