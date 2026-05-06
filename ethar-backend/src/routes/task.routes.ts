import { Router } from "express";
import { getTasks, createTask, updateTaskStatus } from "../controllers/task.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate, taskSchema } from "../validation/schemas";

const router = Router();

router.use(authenticate);
router.get("/", getTasks as any);
router.post("/", validate(taskSchema), createTask as any);
router.patch("/:id/status", updateTaskStatus as any);

export default router;
