import { Router } from "express";
import authController from "../controllers/authController";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", isAuthenticated, authController.logout);

export default router;
