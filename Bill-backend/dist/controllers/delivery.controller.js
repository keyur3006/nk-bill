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
exports.updateDelivery = exports.deleteDelivery = exports.getMonthlyReport = exports.getMyDeliveries = exports.createDelivery = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ✅ CREATE DELIVERY
const createDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("USER 👉", req.user);
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "User not found in token"
            });
        }
        const { workerName, date, bottles, shopNo, block } = req.body;
        const delivery = yield prisma.delivery.create({
            data: {
                workerName,
                date: new Date(date),
                bottles: Number(bottles),
                shopNo,
                block,
                user: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        });
        res.json(delivery);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createDelivery = createDelivery;
// ✅ GET ALL DELIVERY
const getMyDeliveries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveries = yield prisma.delivery.findMany({
            where: req.user.role === "ADMIN"
                ? {}
                : { userId: req.user.id },
            orderBy: {
                createdAt: "desc",
            },
        });
        console.log("USER:", req.user);
        console.log("DATA:", deliveries);
        res.json(deliveries);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});
exports.getMyDeliveries = getMyDeliveries;
// ✅ MONTHLY REPORT
const getMonthlyReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, year } = req.query;
        const start = new Date(`${year}-${month}-01`);
        const end = new Date(`${year}-${month}-31`);
        const data = yield prisma.delivery.groupBy({
            by: ["workerName"],
            _sum: {
                bottles: true
            },
            where: Object.assign(Object.assign({}, (req.user.role === "ADMIN"
                ? {}
                : { userId: req.user.id })), { date: {
                    gte: start,
                    lte: end
                } })
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: "Monthly error" });
    }
});
exports.getMonthlyReport = getMonthlyReport;
const deleteDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield prisma.delivery.delete({
            where: { id },
        });
        res.json({ message: "Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Delete error" });
    }
});
exports.deleteDelivery = deleteDelivery;
const updateDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { workerName, date, bottles } = req.body;
        const updated = yield prisma.delivery.update({
            where: { id },
            data: {
                workerName,
                date: new Date(date),
                bottles: Number(bottles),
            },
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: "Update error" });
    }
});
exports.updateDelivery = updateDelivery;
