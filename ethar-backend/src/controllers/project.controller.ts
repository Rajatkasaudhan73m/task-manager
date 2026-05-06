import { Request, Response } from "express";
import prisma from "../config/db";

export const getProjects = async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || !user.teamId) {
      return res.status(200).json([]);
    }

    const projects = await prisma.project.findMany({
      where: {
        teamId: user.teamId,
      },
      include: { tasks: true },
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProject = async (req: any, res: any) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let user = await prisma.user.findUnique({ where: { id: req.user.id } });
    let currentTeamId = user?.teamId;

    if (!currentTeamId) {
      // Create a default team
      const team = await prisma.team.create({
        data: { name: `${user?.name}'s Team` },
      });
      await prisma.user.update({
        where: { id: req.user.id },
        data: { teamId: team.id },
      });
      currentTeamId = team.id;
    }

    const project = await prisma.project.create({
      data: { name, description, teamId: currentTeamId },
    });
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
