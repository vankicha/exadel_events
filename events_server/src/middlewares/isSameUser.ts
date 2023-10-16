import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_FORBIDDEN } from "../constants/httpStatusCodes";
import { FORBIDDEN } from "../constants/messages";

const isSameUser = (req: Request, res: Response, next: NextFunction) => {
	const authUser = req.body.authUser;
	const userIdParam = req.params.userId;

	if (!authUser || !userIdParam || authUser.id !== userIdParam) {
		return res.status(HTTP_STATUS_FORBIDDEN).json({ message: FORBIDDEN });
	}

	next();
};

export default isSameUser;
