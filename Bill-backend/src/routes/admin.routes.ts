import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";

const router = express.Router();

router.get("/test", authenticate, isAdmin, (req, res) => {
  res.json({ message: "Admin route working ✅" });
});

export default router;