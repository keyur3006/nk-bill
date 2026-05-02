"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delivery_controller_1 = require("../controllers/delivery.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authenticate, delivery_controller_1.createDelivery);
router.get("/", auth_middleware_1.authenticate, delivery_controller_1.getMyDeliveries);
router.delete("/:id", auth_middleware_1.authenticate, delivery_controller_1.deleteDelivery);
router.get("/monthly", auth_middleware_1.authenticate, delivery_controller_1.getMonthlyReport);
router.put("/:id", auth_middleware_1.authenticate, delivery_controller_1.updateDelivery);
exports.default = router;
