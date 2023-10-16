import { z } from "zod";
import { APP_EVENT_TYPES, AppEventType } from "./event";
import {
	NAME_TOO_SHORT_ERROR_MESSAGE,
	EMAIL_INVALID_ERROR_MESSAGE,
	PASSWORD_TOO_SHORT_ERROR_MESSAGE,
	TITLE_TOO_SHORT_ERROR_MESSAGE,
	DESCRIPTION_TOO_SHORT_ERROR_MESSAGE,
	INVALID_DATE_ERROR_MESSAGE,
	END_DATE_AFTER_START_DATE_ERROR_MESSAGE,
	ADDRESS_REQUIRED_ERROR_MESSAGE,
	EVENT_TYPE_ERROR_MESSAGE,
} from "./errors";

export const loginSchema = z.object({
	email: z.string().email({ message: EMAIL_INVALID_ERROR_MESSAGE }),
	password: z.string().min(6, { message: PASSWORD_TOO_SHORT_ERROR_MESSAGE }),
});

export const registerSchema = z.object({
	name: z.string().min(1, { message: NAME_TOO_SHORT_ERROR_MESSAGE }),
	email: z.string().email({ message: EMAIL_INVALID_ERROR_MESSAGE }),
	password: z.string().min(6, { message: PASSWORD_TOO_SHORT_ERROR_MESSAGE }),
});

export const eventSchema = z
	.object({
		title: z.string().min(1, { message: TITLE_TOO_SHORT_ERROR_MESSAGE }),
		description: z.string().min(1, { message: DESCRIPTION_TOO_SHORT_ERROR_MESSAGE }),
		address: z.string().optional(),
		isOnline: z.boolean(),
		type: z.string().refine((value) => Object.values(APP_EVENT_TYPES).includes(value as AppEventType), {
			message: EVENT_TYPE_ERROR_MESSAGE,
		}),
		startDate: z
			.string()
			.refine((value) => !isNaN(new Date(value).getTime()), { message: INVALID_DATE_ERROR_MESSAGE }),
		endDate: z
			.string()
			.refine((value) => !isNaN(new Date(value).getTime()), { message: INVALID_DATE_ERROR_MESSAGE }),
	})
	.refine((data) => (data.isOnline ? true : !!data.address), {
		message: ADDRESS_REQUIRED_ERROR_MESSAGE,
		path: ["address"],
	})
	.refine(
		(obj) => {
			const startDate = new Date(obj.startDate);
			const endDate = new Date(obj.endDate);

			return startDate < endDate;
		},
		{ message: END_DATE_AFTER_START_DATE_ERROR_MESSAGE, path: ["endDate"] }
	);
