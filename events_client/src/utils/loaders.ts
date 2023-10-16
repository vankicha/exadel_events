import { LoaderFunction, LoaderFunctionArgs, redirect } from "react-router-dom";
import axiosInstance, { unauthorizedResponseInterceptor } from "./axios";
import { BASE_API_ROUTES } from "@constants/api";
import { AppEvent } from "@constants/event";
import { AppEventGuest } from "@constants/user";

export type GetEventData = {
	event: AppEvent;
	isSubscribed: boolean;
	guests?: AppEventGuest[];
};

export const redirectAuthorizedUser: LoaderFunction = async () => {
	try {
		axiosInstance.interceptors.response.eject(unauthorizedResponseInterceptor);
		await axiosInstance.get(BASE_API_ROUTES.USER);
		return redirect("/");
	} catch (error) {
		return null;
	}
};

export const getUser: LoaderFunction = async () => {
	try {
		const response = await axiosInstance.get(BASE_API_ROUTES.USER);
		return response.data;
	} catch (error) {
		return null;
	}
};

export const getEvent: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
	try {
		const eventId = params.eventId as string;
		const response = await axiosInstance.get(BASE_API_ROUTES.EVENT.replace(":eventId", eventId));
		return response.data as GetEventData;
	} catch (error) {
		return null;
	}
};

export const getEvents = async () => {
	try {
		const response = await axiosInstance.get(BASE_API_ROUTES.EVENTS);
		return response.data;
	} catch (error) {
		return null;
	}
};
