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
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// GET ALL BOTTLES
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bottles = yield prisma.bottle.findMany({
        orderBy: { id: "asc" }
    });
    res.json(bottles);
}));
// ADD BOTTLE
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price } = req.body;
    const bottle = yield prisma.bottle.create({
        data: {
            name,
            price
        }
    });
    res.json(bottle);
}));
// UPDATE BOTTLE
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price } = req.body;
    try {
        const bottle = yield prisma.bottle.update({
            where: { id: Number(req.params.id) },
            data: {
                name,
                price
            }
        });
        res.json(bottle);
    }
    catch (error) {
        res.status(404).json({ message: "Bottle not found" });
    }
}));
exports.default = router;
