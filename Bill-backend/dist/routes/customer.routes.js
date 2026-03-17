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
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// CREATE CUSTOMER
router.post("/", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, block, shopNo } = req.body;
        if (!name || !block || !shopNo) {
            return res.status(400).json({ message: "All fields required" });
        }
        const customer = yield prisma.customer.create({
            data: {
                name,
                block,
                shopNo,
            }
        });
        res.status(201).json({
            message: "Customer created successfully",
            customer
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}));
// GET ALL CUSTOMERS
router.get("/", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield prisma.customer.findMany({
            orderBy: { id: "desc" }
        });
        res.json(customers);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}));
router.delete("/:id", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        yield prisma.customer.delete({
            where: { id },
        });
        res.json({ message: "Customer deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting customer" });
    }
}));
// UPDATE CUSTOMER PAYMENT STATUS
router.put("/:id/status", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;
        const updatedCustomer = yield prisma.customer.update({
            where: { id },
            data: { status }
        });
        res.json({
            message: "Status updated successfully",
            customer: updatedCustomer
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating status" });
    }
}));
exports.default = router;
