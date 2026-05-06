import { Request, Response } from "express";
import prisma from "../config/db";

export const getTeamMembers = async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || !user.teamId) {
      return res.status(200).json([]);
    }

    const team = await prisma.team.findUnique({
      where: { id: user.teamId },
      include: {
        users: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    res.status(200).json(team?.users || []);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
