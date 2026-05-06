import { Router } from "express";
import { getProjects, createProject } from "../controllers/project.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate, projectSchema } from "../validation/schemas";

const router = Router();

router.use(authenticate);
router.get("/", getProjects as any);
router.post("/", authorize(["ADMIN"]), validate(projectSchema), createProject as any);

export default router;
