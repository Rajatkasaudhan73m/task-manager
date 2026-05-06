import { Router } from "express";
import { getTeamMembers } from "../controllers/team.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);
router.get("/", getTeamMembers as any);

export default router;
