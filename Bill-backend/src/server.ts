import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Routes
import dashboardRoutes from "./routes/dashboard.routes";
import authRoutes from "./routes/auth.routes";
import billRoutes from "./routes/bill.routes";
import customerRoutes from "./routes/customer.routes";
import categoryRoutes from "./routes/category";
import bottleRoutes from "./routes/bottle.routes";
import deliveryRoutes from "./routes/delivery.routes";
import adminRoutes from "./routes/admin.routes";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";
dotenv.config();

const app = express();
const prisma = new PrismaClient();

/* ================= CORS ================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://nk-bill.vercel.app",
  "https://keyurbill.online",
  "https://www.keyurbill.online",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* ❌ REMOVE THIS (IMPORTANT) */
// app.options("*", cors());

/* ================= MIDDLEWARE ================= */

app.use(express.json());

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/bottles", bottleRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
/* ================= STATIC ================= */

app.use("/pdfs", express.static("public/pdfs"));

/* ================= TEST ROUTES ================= */

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 NR Server running with Neon DB");
});

app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("❌ DB Error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

/* ================= ERROR HANDLER ================= */

app.use(
  (err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error("❌ Global Error:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
);

/* ================= SERVER ================= */

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

/* ================= SHUTDOWN ================= */

process.on("SIGINT", async () => {
  console.log("🛑 Server shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});