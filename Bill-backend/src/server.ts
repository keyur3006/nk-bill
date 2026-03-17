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

app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/bottles", bottleRoutes);
app.use("/api/dashboard", dashboardRoutes);

// PDF access
app.use("/pdfs", express.static("src/public/pdfs"));

/* ================= TEST ROUTE ================= */

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});