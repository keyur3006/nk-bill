import express from "express";
import {
  createDelivery,
  getMyDeliveries,
  getMonthlyReport,
  deleteDelivery,
  updateDelivery,
} from "../controllers/delivery.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authenticate, createDelivery);
router.get("/", authenticate, getMyDeliveries);
router.delete("/:id", authenticate, deleteDelivery);
router.get("/monthly", authenticate, getMonthlyReport);
router.put("/:id", authenticate, updateDelivery);

export default router;