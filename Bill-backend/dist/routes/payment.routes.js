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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
/* ================= RAZORPAY INIT ================= */
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
/* ================= CREATE ORDER ================= */
router.post("/create-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const order = yield razorpay.orders.create({
            amount: amount * 100, // ₹ to paise
            currency: "INR",
        });
        res.json(order);
    }
    catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ message: "Order creation failed" });
    }
}));
/* ================= VERIFY PAYMENT ================= */
router.post("/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, product, amount, } = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET;
        // 🔐 Signature verify
        const generatedSignature = crypto_1.default
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
        const order = yield prisma.order.create({
            data: {
                userId,
                product,
                amount,
                paymentMethod: "ONLINE",
                status: "confirmed",
            },
        });
        // ✅ PAYMENT SAVE
        yield prisma.payment.create({
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
    }
    catch (error) {
        console.error("Verify Error:", error);
        res.status(500).json({
            message: "Verification failed",
        });
    }
}));
exports.default = router;
