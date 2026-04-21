import express from "express";
import {
  createDelivery,
  getMyDeliveries,
  getMonthlyReport
} from "../controllers/delivery.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authenticate, createDelivery);
router.get("/", authenticate, getMyDeliveries);
router.get("/monthly", authenticate, getMonthlyReport);

export default router;