import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth.middleware";

const prisma = new PrismaClient();

// ✅ CREATE DELIVERY
export const createDelivery = async (req: AuthRequest, res: Response) => {
  try {
    console.log("USER 👉", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "User not found in token"
      });
    }

    const { workerName, date, bottles, shopNo, block } = req.body;

    const delivery = await prisma.delivery.create({
      data: {
        workerName,
        date: new Date(date),
        bottles: Number(bottles),
        shopNo,
        block,
        user: {
          connect: {
            id: req.user.id
          }
        }
      }
    });

    res.json(delivery);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET ALL DELIVERY
export const getMyDeliveries = async (req: AuthRequest, res: Response) => {
  try {
    const deliveries = await prisma.delivery.findMany({
      where:
        req.user!.role === "ADMIN"
          ? {}
          : { userId: req.user!.id },

      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("USER:", req.user);
    console.log("DATA:", deliveries);

    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

// ✅ MONTHLY REPORT
export const getMonthlyReport = async (req: AuthRequest, res: Response) => {
  try {
    const { month, year } = req.query;

    const start = new Date(`${year}-${month}-01`);
    const end = new Date(`${year}-${month}-31`);

    const data = await prisma.delivery.groupBy({
      by: ["workerName"],
      _sum: {
        bottles: true
      },
      where: {
        ...(req.user!.role === "ADMIN"
          ? {}
          : { userId: req.user!.id }),

        date: {
          gte: start,
          lte: end
        }
      }
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Monthly error" });
  }
};

export const deleteDelivery = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.delivery.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete error" });
  }
};
export const updateDelivery = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { workerName, date, bottles } = req.body;

    const updated = await prisma.delivery.update({
      where: { id },
      data: {
        workerName,
        date: new Date(date),
        bottles: Number(bottles),
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update error" });
  }
};