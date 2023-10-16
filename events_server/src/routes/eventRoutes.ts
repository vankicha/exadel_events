import { Router } from "express";
import eventController from "../controllers/eventController";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

router.get("/:eventId", eventController.getOne);
router.get("/", eventController.getMany);
router.post("/", isAdmin, eventController.create);
router.put("/:eventId", isAdmin, eventController.updateOne);
router.delete("/:eventId", isAdmin, eventController.deleteOne);

export default router;
