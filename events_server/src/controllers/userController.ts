import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import eventGuestService from "../services/eventGuestService";
import CustomError from "../utils/CustomError";
import { HTTP_STATUS_OK, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED } from "../constants/httpStatusCodes";
import { USER_LOADING_FAILED, SUBSCRIBE_FAILED, UNSUBSCRIBE_FAILED } from "../constants/errors";
import { AuthBody } from "../constants/user";

interface GetUserRequest extends Request {
	body: AuthBody;
}

const getUser = async (req: GetUserRequest, res: Response, next: NextFunction) => {
	try {
		const userId = req.body.authUser.id;
		const user = await userService.findUniqueById(userId);

		res.status(HTTP_STATUS_OK).json(user);
	} catch (error) {
		next(new CustomError(USER_LOADING_FAILED, HTTP_STATUS_BAD_REQUEST));
	}
};

const subscribe = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId, eventId } = req.params;

		await eventGuestService.subscribe(userId, eventId);

		res.status(HTTP_STATUS_CREATED).json({ subscribed: true });
	} catch (error) {
		next(new CustomError(SUBSCRIBE_FAILED, HTTP_STATUS_BAD_REQUEST));
	}
};

const unsubscribe = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId, eventId } = req.params;

		await eventGuestService.unsubscribe(userId, eventId);

		res.status(HTTP_STATUS_OK).json({ subscribed: false });
	} catch (error) {
		next(new CustomError(UNSUBSCRIBE_FAILED, HTTP_STATUS_BAD_REQUEST));
	}
};

const profileController = {
	getUser,
	subscribe,
	unsubscribe,
};

export default profileController;
