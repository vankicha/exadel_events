import { Request, Response, NextFunction } from "express";
import eventService from "../services/eventService";
import eventGuestService from "../services/eventGuestService";
import CustomError from "../utils/CustomError";
import { AuthBody, Role, AppEventGuest } from "../constants/user";
import { AppEvent, CreateOrUpdateEventBody } from "../constants/event";
import {
	HTTP_STATUS_OK,
	HTTP_STATUS_CREATED,
	HTTP_STATUS_BAD_REQUEST,
	HTTP_STATUS_NOT_FOUND,
} from "../constants/httpStatusCodes";
import {
	CANNOT_GET_EVENT,
	CANNOT_GET_EVENTS,
	CREATE_EVENT_FAILED,
	UPDATE_EVENT_FAILED,
	DELETE_EVENT_FAILED,
} from "../constants/errors";
import { eventSchema } from "../constants/validationSchema";

interface GetOneEventRequest extends Request {
	body: AuthBody;
}

interface GetManyEventsRequest extends Request {
	body: AuthBody;
}

interface CreateOrUpdateEventRequest extends Request {
	body: AuthBody & CreateOrUpdateEventBody;
}

interface CreateOrUpdateEventRequest extends Request {
	body: AuthBody & CreateOrUpdateEventBody;
}

const getOne = async (req: GetOneEventRequest, res: Response, next: NextFunction) => {
	try {
		const userId = req.body.authUser.id;
		const isAdmin = req.body.authUser.role === Role.ADMIN;
		const { eventId } = req.params;

		const data = {} as { event: AppEvent; isSubscribed: boolean; guests?: AppEventGuest[] };

		data.event = await eventService.getOne(eventId);
		data.isSubscribed = !!(await eventGuestService.getSubscription(userId, eventId));

		if (isAdmin) data.guests = await eventGuestService.getEventGuests(eventId);

		res.status(HTTP_STATUS_OK).json(data);
	} catch (error) {
		next(new CustomError(CANNOT_GET_EVENT, HTTP_STATUS_NOT_FOUND));
	}
};

const getMany = async (req: GetManyEventsRequest, res: Response, next: NextFunction) => {
	try {
		const isAdmin = req.body.authUser.role === Role.ADMIN;

		let events: AppEvent[] = [];

		if (isAdmin) {
			events = await eventService.getAll();
		} else {
			events = await eventService.getActive();
		}

		res.status(HTTP_STATUS_OK).json(events);
	} catch (error) {
		next(new CustomError(CANNOT_GET_EVENTS, HTTP_STATUS_NOT_FOUND));
	}
};

const create = async (req: CreateOrUpdateEventRequest, res: Response, next: NextFunction) => {
	try {
		eventSchema.parse(req.body);

		const { authUser, ...event } = req.body;

		const createdEvent = await eventService.create(event);

		res.status(HTTP_STATUS_CREATED).json(createdEvent);
	} catch (error) {
		next(new CustomError(CREATE_EVENT_FAILED, HTTP_STATUS_BAD_REQUEST));
	}
};

const updateOne = async (req: CreateOrUpdateEventRequest, res: Response, next: NextFunction) => {
	try {
		eventSchema.parse(req.body);

		const { eventId } = req.params;
		const { authUser, ...event } = req.body;

		const updatedEvent = await eventService.updateOne(eventId, event);

		res.status(HTTP_STATUS_OK).json(updatedEvent);
	} catch (error) {
		next(new CustomError(UPDATE_EVENT_FAILED, HTTP_STATUS_BAD_REQUEST));
	}
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { eventId } = req.params;

		await eventService.deleteOne(eventId);

		res.status(HTTP_STATUS_OK).json({ deleted: true });
	} catch (error) {
		next(new CustomError(DELETE_EVENT_FAILED, HTTP_STATUS_BAD_REQUEST));
	}
};

const eventController = {
	getOne,
	getMany,
	create,
	updateOne,
	deleteOne,
};

export default eventController;
