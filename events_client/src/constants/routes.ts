export const ROUTES = {
	REGISTER: "/register",
	LOGIN: "/login",
	BASE: "/",
	EVENTS: "/events",
	EVENT: "/events/:eventId",

	API: "/api",
	API_CREATE_EVENT: "/api/event/post",
	API_EDIT_EVENT: "/api/event/:eventId/put",
	API_DELETE_EVENT: "/api/event/:eventId/delete",
	API_SUBSCRIBE: "/api/users/:userId/subscribe/:eventId/post",
	API_UNSUBSCRIBE: "/api/users/:userId/subscribe/:eventId/delete",
	API_LOGOUT: "/api/auth/logout",
};

export const ROUTES_IDS = {
	BASE: "base",
};
