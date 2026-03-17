import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();
const prisma = new PrismaClient();

// CREATE CUSTOMER
router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const { name, block, shopNo } = req.body;

    if (!name || !block || !shopNo) {
      return res.status(400).json({ message: "All fields required" });
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        block,
        shopNo,
      }
    });

    res.status(201).json({
      message: "Customer created successfully",
      customer
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL CUSTOMERS
router.get("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { id: "desc" }
    });

    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authenticate, async (req:AuthRequest, res) => {
  try{
    const id = Number(req.params.id);

    await prisma.customer.delete({
      where: { id },
    }) 
    res.json({ message: "Customer deleted successfully" });

  }
  catch (error) {
    res.status(500).json({ message: "Error deleting customer" });
  }
})

// UPDATE CUSTOMER PAYMENT STATUS
router.put("/:id/status", authenticate, async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: { status }
    });

    res.json({
      message: "Status updated successfully",
      customer: updatedCustomer
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating status" });
  }
});

export default router;