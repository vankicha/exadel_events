export const BASE_API_ROUTES = {
	REGISTER: "/auth/register",
	LOGIN: "/auth/login",
	LOGOUT: "/auth/logout",
	USER: "/user",
	EVENTS: "/events",
	EVENT: "/events/:eventId",
	SUBSCRIBE: "/users/:userId/subscribe/:eventId",
};

export const MAPBOX_API_ROUTES = {
	MAPBOX_PLACES: "/mapbox.places/{location}.json",
};
