import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { NO_TOKEN, UNAUTHORIZED } from "../constants/messages";
import { JWTPayloadIdToken } from "../constants/user";
import { HTTP_STATUS_UNAUTHORIZED } from "../constants/httpStatusCodes";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.id_token;

	if (!token) {
		return res.status(HTTP_STATUS_UNAUTHORIZED).json({ message: NO_TOKEN });
	}

	try {
		const decoded = jwt.verify(token, config.SECRET_KEY) as JWTPayloadIdToken;

		req.body.authUser = { id: decoded.id, role: decoded.role };

		next();
	} catch (err) {
		return res.status(HTTP_STATUS_UNAUTHORIZED).json({ message: UNAUTHORIZED });
	}
};

export default isAuthenticated;
