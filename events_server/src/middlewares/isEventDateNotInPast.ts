import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_BAD_REQUEST } from "../constants/httpStatusCodes";
import { EVENT_ENDED } from "../constants/errors";
import eventService from "../services/eventService";

const isEventDateNotInPast = async (req: Request, res: Response, next: NextFunction) => {
	const eventId = req.params.eventId;

	try {
		const event = await eventService.getOne(eventId);

		if (!event || new Date(event.endDate) < new Date()) throw new Error();

		next();
	} catch (error) {
		return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: EVENT_ENDED });
	}
};

export default isEventDateNotInPast;
