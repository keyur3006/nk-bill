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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendMail_1 = require("../utils/sendMail");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
/* ================= REGISTER ================= */
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        const existingUser = yield prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        // ✅ OTP Generate
        const otp = Math.floor(100000 +
            Math.random() * 900000).toString();
        // ✅ Hash Password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // ✅ Create User
        const user = yield prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: "KARIGAR",
                otp,
                otpExpiry: new Date(Date.now() +
                    5 * 60 * 1000),
                isVerified: false,
            },
        });
        // ✅ Send OTP Email
        yield (0, sendMail_1.sendOtpMail)(email, otp);
        res.status(201).json({
            success: true,
            message: "OTP sent to your email",
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}));
/* ================= LOGIN ================= */
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // ✅ Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        // ✅ Find User
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user || !user.password) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        // ✅ OTP Verify Check
        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Please verify OTP first",
            });
        }
        // ✅ Compare Password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        // ✅ JWT Secret
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET not found");
        }
        // ✅ Generate Token
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        }, secret, {
            expiresIn: "1d",
        });
        // ✅ Response
        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}));
/* ================= VERIFY OTP ================= */
router.post("/verify-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }
        // ✅ Verify User
        yield prisma.user.update({
            where: { email },
            data: {
                isVerified: true,
                otp: null,
                otpExpiry: null,
            },
        });
        res.json({
            success: true,
            message: "OTP verified successfully",
        });
    }
    catch (error) {
        console.error("OTP Verify Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}));
/* ================= ALL USERS ================= */
router.get("/all-users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed",
        });
    }
}));
router.delete("/delete-user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.user.delete({
            where: {
                id: Number(id),
            },
        });
        res.json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Delete failed",
        });
    }
}));
exports.default = router;
