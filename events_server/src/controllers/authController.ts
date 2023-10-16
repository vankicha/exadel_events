import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import authService from "../services/authService";
import userService from "../services/userService";
import jwtService from "../services/jwtService";
import CustomError from "../utils/CustomError";
import config from "../config";
import { RegisterBody, LoginBody, User, ID_TOKEN_COOKIE } from "../constants/user";
import {
	USER_REGISTRATION_FAILED,
	WRONG_EMAIL_OR_PASSWORD,
	USER_LOGIN_FAILED,
	USER_LOGOUT_FAILED,
} from "../constants/errors";
import {
	USER_REGISTERED_SUCCESSFULLY,
	USER_LOGGED_IN_SUCCESSFULLY,
	USER_LOGGED_OUT_SUCCESSFULLY,
} from "../constants/messages";
import { HTTP_STATUS_OK, HTTP_STATUS_CREATED, HTTP_STATUS_BAD_REQUEST } from "../constants/httpStatusCodes";
import { loginSchema, registerSchema } from "../constants/validationSchema";

interface RegisterRequest extends Request {
	body: RegisterBody;
}

interface LoginRequest extends Request {
	body: LoginBody;
}

const register = async (req: RegisterRequest, res: Response, next: NextFunction) => {
	try {
		registerSchema.parse(req.body);

		const existingUser = await userService.findUniqueByEmail(req.body.email);

		if (existingUser) {
			throw new CustomError(USER_REGISTRATION_FAILED, HTTP_STATUS_BAD_REQUEST);
		}

		await authService.register(req.body);
		res.status(HTTP_STATUS_CREATED).json({ message: USER_REGISTERED_SUCCESSFULLY });
	} catch (error) {
		if (!(error instanceof CustomError)) {
			error = new CustomError(USER_REGISTRATION_FAILED, HTTP_STATUS_BAD_REQUEST);
		}
		next(error);
	}
};

const login = async (req: LoginRequest, res: Response, next: NextFunction) => {
	try {
		loginSchema.parse(req.body);

		const existingUser = await userService.findUniqueByEmail(req.body.email);

		if (!existingUser) {
			throw new CustomError(WRONG_EMAIL_OR_PASSWORD, HTTP_STATUS_BAD_REQUEST);
		}

		const isPasswordMatch = await bcrypt.compare(req.body.password, existingUser.password);

		if (!isPasswordMatch) {
			throw new CustomError(WRONG_EMAIL_OR_PASSWORD, HTTP_STATUS_BAD_REQUEST);
		}

		const token = jwtService.generate({ id: existingUser.id, role: existingUser.role as User["role"] });

		res.cookie(ID_TOKEN_COOKIE, token, {
			httpOnly: true,
			secure: true,
			maxAge: config.JWT_EXPIRATION_TIME * 1000,
		});
		res.status(HTTP_STATUS_OK).json({ message: USER_LOGGED_IN_SUCCESSFULLY });
	} catch (error) {
		if (!(error instanceof CustomError)) {
			error = new CustomError(USER_LOGIN_FAILED, HTTP_STATUS_BAD_REQUEST);
		}
		next(error);
	}
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.clearCookie(ID_TOKEN_COOKIE);
		res.status(HTTP_STATUS_OK).json({ message: USER_LOGGED_OUT_SUCCESSFULLY });
	} catch (error) {
		if (!(error instanceof CustomError)) {
			error = new CustomError(USER_LOGOUT_FAILED, HTTP_STATUS_BAD_REQUEST);
		}
		next(error);
	}
};

const authController = {
	register,
	login,
	logout,
};

export default authController;
