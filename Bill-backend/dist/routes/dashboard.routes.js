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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get("/stats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalCustomers = yield prisma.customer.count();
        const bills = yield prisma.bill.findMany();
        const totalRevenue = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);
        const pendingPayments = bills
            .filter((bill) => bill.status === "PENDING")
            .reduce((sum, bill) => sum + bill.totalAmount, 0);
        const bottlesDelivered = bills.reduce((sum, bill) => sum + bill.totalBottles, 0);
        res.json({
            totalCustomers,
            bottlesDelivered,
            totalRevenue,
            pendingPayments,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}));
exports.default = router;
