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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const bill_routes_1 = __importDefault(require("./routes/bill.routes"));
const customer_routes_1 = __importDefault(require("./routes/customer.routes"));
const category_1 = __importDefault(require("./routes/category"));
const bottle_routes_1 = __importDefault(require("./routes/bottle.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* ================= ROUTES ================= */
app.use("/api/auth", auth_routes_1.default);
app.use("/api/bills", bill_routes_1.default);
app.use("/api/customers", customer_routes_1.default);
app.use("/api/categories", category_1.default);
app.use("/api/bottles", bottle_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
// PDF access
app.use("/pdfs", express_1.default.static("src/public/pdfs"));
/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
    res.send("NR Server is running 🚀");
});
app.get("/test-db", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Database connection failed" });
    }
}));
/* ================= SERVER ================= */
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
