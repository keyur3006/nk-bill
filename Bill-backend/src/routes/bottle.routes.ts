import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const router = express.Router();
const prisma = new PrismaClient();

// GET ALL BOTTLES
router.get("/", async (req: Request, res: Response) => {
  const bottles = await prisma.bottle.findMany({
    orderBy: { id: "asc" }
  });

  res.json(bottles);
});

// ADD BOTTLE
router.post("/", async (req: Request, res: Response) => {
  const { name, price } = req.body;

  try {
    const bottle = await prisma.bottle.create({
      data: {
        name,
        price
      }
    });

    // 🔥 Google Sheet API call
    await axios.post(
      "https://script.google.com/macros/s/AKfycbw9yH34twM6XZdoS7vlyjN25t8_tJYoFii1DNLJ-hXvPZPT-pqz-wJW142RsktKd3I/exec",
      {
        name: bottle.name,
        price: bottle.price,
        type: "Bottle",
        date: new Date()
      }
    );

    res.json(bottle);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving bottle" });
  }
});

// UPDATE BOTTLE
router.put("/:id", async (req: Request, res: Response) => {
  const { name, price } = req.body;

  try {
    const bottle = await prisma.bottle.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        price
      }
    });

    res.json(bottle);
  } catch (error) {
    res.status(404).json({ message: "Bottle not found" });
  }
});

export default router;