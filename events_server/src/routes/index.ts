import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import eventRoutes from "./eventRoutes";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", isAuthenticated, userRoutes);
router.use("/users", isAuthenticated, userRoutes);
router.use("/events", isAuthenticated, eventRoutes);

export default router;
