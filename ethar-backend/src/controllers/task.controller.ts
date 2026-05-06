import { Request, Response } from "express";
import prisma from "../config/db";

export const createTask = async (req: any, res: any) => {
  try {
    const { title, description, projectId, assigneeId, dueDate, status } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        assigneeId,
        status: status || "TODO",
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      include: { assignee: { select: { id: true, name: true, email: true } } },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req: any, res: any) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { assigneeId: req.user.id },
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTaskStatus = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await prisma.task.update({
      where: { id },
      data: { status },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
