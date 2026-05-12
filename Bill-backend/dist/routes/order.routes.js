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
const auth_middleware_1 = require("../middleware/auth.middleware");
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
/* ================= CREATE ORDER ================= */
router.post("/", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { product, amount, paymentMethod } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const order = yield prisma.order.create({
            data: {
                userId: Number(userId),
                product,
                amount,
                paymentMethod,
                status: "pending",
            },
        });
        res.json(order);
    }
    catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({
            message: "Failed to create order",
        });
    }
}));
/* ================= MY ORDERS ================= */
router.get("/my-orders", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const orders = yield prisma.order.findMany({
            where: {
                userId: Number(userId),
            },
            include: {
                payments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(orders);
    }
    catch (error) {
        console.error("Fetch Orders Error:", error);
        res.status(500).json({
            message: "Failed to fetch orders",
        });
    }
}));
/* ================= UPDATE DELIVERY STATUS ================= */
router.put("/update-status/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deliveryStatus } = req.body;
        const order = yield prisma.order.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                deliveryStatus,
            },
        });
        res.json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update status",
        });
    }
}));
/* ================= ALL ORDERS ================= */
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prisma.order.findMany({
            include: {
                user: true,
                payments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch orders",
        });
    }
}));
exports.default = router;
