"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_middleware_1 = require("../middleware/auth.middleware");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jspdf_1 = __importDefault(require("jspdf"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
/* ===========================
   CREATE BILL + GENERATE PDF
=========================== */
router.post("/", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, month, year, bottleName, bottlePrice, quantityPerDay } = req.body;
        if (!customerId || !month || !year || !bottleName || !bottlePrice || !quantityPerDay) {
            return res.status(400).json({ message: "All fields required" });
        }
        // Check customer
        const customer = yield prisma.customer.findUnique({
            where: { id: customerId }
        });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        // Check user
        const user = yield prisma.user.findUnique({
            where: { id: req.user.id }
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
        const doc = new jspdf_1.default();
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
        const pdfDir = path_1.default.join(process.cwd(), "public/pdfs");
        if (!fs_1.default.existsSync(pdfDir)) {
            fs_1.default.mkdirSync(pdfDir, { recursive: true });
        }
        const pdfFileName = `bill_${customerId}_${month}_${year}.pdf`;
        const pdfPath = path_1.default.join(pdfDir, pdfFileName);
        const pdfBuffer = doc.output("arraybuffer");
        fs_1.default.writeFileSync(pdfPath, Buffer.from(pdfBuffer));
        /* ===========================
           SAVE BILL IN DATABASE
        =========================== */
        const bill = yield prisma.bill.create({
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
                    connect: { id: req.user.id }
                }
            }
        });
        res.status(201).json({
            message: "Bill created successfully",
            bill
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}));
/* ===========================
   GET ALL BILLS
=========================== */
router.get("/", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bills = yield prisma.bill.findMany({
            include: { customer: true },
            orderBy: { id: "desc" }
        });
        res.json(bills);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}));
/* ===========================
   UPDATE PAYMENT STATUS
=========================== */
router.patch("/:id/status", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const billId = Number(req.params.id);
        const { status } = req.body;
        const updatedBill = yield prisma.bill.update({
            where: { id: billId },
            data: { status }
        });
        res.json({
            message: "Payment status updated successfully",
            bill: updatedBill
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}));
/* ===========================
   DELETE BILL
=========================== */
router.delete("/:id", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        yield prisma.bill.delete({
            where: { id }
        });
        res.json({ message: "Bill deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting bill" });
    }
}));
/* ===========================
   VIEW PDF
=========================== */
router.get("/:id/pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const bill = yield prisma.bill.findUnique({
            where: { id }
        });
        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        if (!bill.pdfUrl) {
            return res.status(404).json({ message: "PDF not available" });
        }
        const pdfPath = path_1.default.join(process.cwd(), "src/public/pdfs", path_1.default.basename(bill.pdfUrl));
        res.sendFile(pdfPath);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error loading PDF" });
    }
}));
exports.default = router;
