import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { redirect } from "react-router-dom";
import { HTTP_STATUS_UNAUTHORIZED } from "@constants/httpStatusCodes";
import { ROUTES } from "@constants/routes";

const instance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API_URL,
	withCredentials: true,
});

export const unauthorizedResponseInterceptor = instance.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		if (error.response?.status === HTTP_STATUS_UNAUTHORIZED) {
			throw redirect(ROUTES.LOGIN);
		}

		return Promise.reject(error);
	}
);

export default instance;
