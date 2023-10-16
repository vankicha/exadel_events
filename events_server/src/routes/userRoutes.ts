import { Router } from "express";
import userController from "../controllers/userController";
import isSameUser from "../middlewares/isSameUser";
import isNotSubscribed from "../middlewares/isNotSubscribed";
import isEventDateNotInPast from "../middlewares/isEventDateNotInPast";

const router = Router();

router.get("/", userController.getUser);
router.post("/:userId/subscribe/:eventId", isSameUser, isNotSubscribed, isEventDateNotInPast, userController.subscribe);
router.delete("/:userId/subscribe/:eventId", isSameUser, isEventDateNotInPast, userController.unsubscribe);

export default router;
