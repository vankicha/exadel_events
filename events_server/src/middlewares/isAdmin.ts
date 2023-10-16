import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_UNAUTHORIZED } from "../constants/httpStatusCodes";
import { UNAUTHORIZED } from "../constants/messages";
import { Role } from "../constants/user";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	const authUser = req.body.authUser;

	if (!authUser || authUser.role !== Role.ADMIN) {
		return res.status(HTTP_STATUS_UNAUTHORIZED).json({ message: UNAUTHORIZED });
	}

	next();
};

export default isAdmin;
