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
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
/* ================= GET PROFILE ================= */
router.get("/me", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            },
        });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch profile",
        });
    }
}));
/* ================= UPDATE PROFILE ================= */
router.put("/update", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, mobile, address, city, pincode, } = req.body;
        const updatedUser = yield prisma.user.update({
            where: {
                id: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            },
            data: {
                name,
                mobile,
                address,
                city,
                pincode,
            },
        });
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Profile update failed",
        });
    }
}));
exports.default = router;
