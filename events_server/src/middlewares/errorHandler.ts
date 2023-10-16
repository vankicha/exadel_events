import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from "../constants/httpStatusCodes";
import { SOMETHING_WENT_WRONG } from "../constants/errors";
import CustomError from "../utils/CustomError";

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
	error.status = error.status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
	error.message = error.message || SOMETHING_WENT_WRONG;
	res.status(error.status).json({ message: error.message });
};

export default errorHandler;
