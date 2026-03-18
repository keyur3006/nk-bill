import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import dashboardRoutes from "./routes/dashboard.routes";
import authRoutes from "./routes/auth.routes";
import billRoutes from "./routes/bill.routes";
import customerRoutes from "./routes/customer.routes";
import categoryRoutes from "./routes/category";
import bottleRoutes from "./routes/bottle.routes";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

/* ================= DB CONNECT ================= */

prisma.$connect()
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => {
    console.error("❌ Database Error:", err);
    process.exit(1);
  });

/* ================= CORS FIX ================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nk-bill-fbc4.vercel.app",
    ],
    credentials: true,
  })
);

// ✅ IMPORTANT (fix timeout issue)


/* ================= MIDDLEWARE ================= */

app.use(express.json());

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/bottles", bottleRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ================= STATIC ================= */

app.use("/pdfs", express.static("src/public/pdfs"));

/* ================= TEST ROUTES ================= */

app.get("/", (req, res) => {
  res.send("NR Server is running 🚀");
});

app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});