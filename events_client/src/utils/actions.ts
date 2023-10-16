import { redirect, ActionFunction, ActionFunctionArgs } from "react-router-dom";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { NotificationContextType } from "@contexts/NotificationContext";
import axiosInstance from "@utils/axios";
import { handleZodError } from "./helpers";
import { BASE_API_ROUTES } from "@constants/api";
import {
	registerSchema,
	loginSchema,
	eventSchema,
	EventSchema,
	LoginSchema,
	RegisterSchema,
} from "@constants/validationSchema";
import { ROUTES } from "@constants/routes";

export const register =
	(contextValue: NotificationContextType) =>
	async ({ request }: ActionFunctionArgs) => {
		try {
			const formData = await request.formData();
			const updates = Object.fromEntries(formData) as RegisterSchema;
			registerSchema.parse(updates);

			await axiosInstance.post(BASE_API_ROUTES.REGISTER, updates);
			return redirect(ROUTES.LOGIN);
		} catch (error) {
			if (error instanceof ZodError) {
				return handleZodError(error);
			}

			if (contextValue && error instanceof AxiosError && error.response) {
				contextValue.showNotification(error.response.data.message);
			}

			return redirect(ROUTES.REGISTER);
		}
	};

export const login =
	(contextValue: NotificationContextType) =>
	async ({ request }: ActionFunctionArgs) => {
		try {
			const formData = await request.formData();
			const updates = Object.fromEntries(formData) as LoginSchema;
			loginSchema.parse(updates);

			await axiosInstance.post(BASE_API_ROUTES.LOGIN, updates);
			return redirect(ROUTES.EVENTS);
		} catch (error) {
			if (error instanceof ZodError) {
				return handleZodError(error);
			}

			if (contextValue && error instanceof AxiosError && error.response) {
				contextValue.showNotification(error.response.data.message);
			}

			return null;
		}
	};

export const logout: ActionFunction = async () => {
	try {
		await axiosInstance.post(BASE_API_ROUTES.LOGOUT);
		return redirect(ROUTES.LOGIN);
	} catch (error) {
		return redirect(ROUTES.BASE);
	}
};

export const createEvent: ActionFunction = async ({ request }: ActionFunctionArgs) => {
	try {
		const formData = await request.formData();
		const updates = Object.fromEntries(formData) as EventSchema;
		eventSchema.parse(updates);

		await axiosInstance.post(BASE_API_ROUTES.EVENTS, {
			...updates,
			startDate: new Date(updates.startDate),
			endDate: new Date(updates.endDate),
			isOnline: !!updates.isOnline,
		});
		return { hide: true };
	} catch (error) {
		if (error instanceof ZodError) {
			return handleZodError(error);
		}
		return redirect(ROUTES.EVENTS);
	}
};

export const editEvent: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
	const eventId = params.eventId as string;
	try {
		const formData = await request.formData();
		const updates = Object.fromEntries(formData);
		eventSchema.parse(updates);

		await axiosInstance.put(BASE_API_ROUTES.EVENT.replace(":eventId", eventId), {
			...updates,
			startDate: new Date(updates.startDate as string),
			endDate: new Date(updates.endDate as string),
			isOnline: !!updates.isOnline,
		});
		return { hide: true };
	} catch (error) {
		if (error instanceof ZodError) {
			return handleZodError(error);
		}
		return redirect(eventId ? ROUTES.EVENT.replace(":eventId", eventId) : ROUTES.EVENTS);
	}
};

export const deleteEvent: ActionFunction = async ({ params }: ActionFunctionArgs) => {
	try {
		const eventId = params.eventId as string;

		await axiosInstance.delete(BASE_API_ROUTES.EVENT.replace(":eventId", eventId));
		return redirect(ROUTES.EVENTS);
	} catch (error) {
		return null;
	}
};

export const subscribe: ActionFunction = async ({ params }: ActionFunctionArgs) => {
	try {
		const userId = params.userId as string;
		const eventId = params.eventId as string;

		return axiosInstance.post(BASE_API_ROUTES.SUBSCRIBE.replace(":userId", userId).replace(":eventId", eventId));
	} catch (error) {
		return null;
	}
};

export const unsubscribe: ActionFunction = async ({ params }: ActionFunctionArgs) => {
	try {
		const userId = params.userId as string;
		const eventId = params.eventId as string;

		return axiosInstance.delete(BASE_API_ROUTES.SUBSCRIBE.replace(":userId", userId).replace(":eventId", eventId));
	} catch (error) {
		return null;
	}
};
