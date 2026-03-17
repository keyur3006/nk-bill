import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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

  const bottle = await prisma.bottle.create({
    data: {
      name,
      price
    }
  });

  res.json(bottle);
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