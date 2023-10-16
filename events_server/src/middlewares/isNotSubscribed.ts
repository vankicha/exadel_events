import { Request, Response, NextFunction } from "express";
import eventGuestService from "../services/eventGuestService";
import { HTTP_STATUS_BAD_REQUEST } from "../constants/httpStatusCodes";
import { SUBSCRIBE_FAILED } from "../constants/errors";

const isSubscribed = async (req: Request, res: Response, next: NextFunction) => {
	const userId = req.body.authUser.id;
	const eventId = req.params.eventId;

	try {
		const existingSubscription = await eventGuestService.getSubscription(userId, eventId);

		if (existingSubscription) throw new Error();

		next();
	} catch (error) {
		return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: SUBSCRIBE_FAILED });
	}
};

export default isSubscribed;
