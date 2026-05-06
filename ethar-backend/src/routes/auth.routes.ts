import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate, registerSchema, loginSchema } from "../validation/schemas";

const router = Router();

router.post("/register", validate(registerSchema), register as any);
router.post("/login", validate(loginSchema), login as any);

export default router;
