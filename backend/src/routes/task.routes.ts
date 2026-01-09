import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { getTasks } from "../controllers/task.controller";

const router = Router();

router.get("/", authenticate, getTasks);

export default router;
