import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET categories
router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

// ADD category
router.post("/", async (req, res) => {
  const { name } = req.body;

  const category = await prisma.category.create({
    data: { name },
  });

  res.json(category);
});

// UPDATE category
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const updated = await prisma.category.update({
    where: { id },
    data: { name },
  });

  res.json(updated);
});

// DELETE category
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.category.delete({
    where: { id },
  });

  res.json({ message: "Deleted successfully" });
});

export default router;