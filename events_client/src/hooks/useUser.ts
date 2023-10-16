import { useRouteLoaderData } from "react-router-dom";
import { ROUTES_IDS } from "@constants/routes";
import { Role, User } from "@constants/user";

type ExtendedUser = User & { isGuest: boolean; isAdmin: boolean };

const useUser = (): ExtendedUser => {
	const user = useRouteLoaderData(ROUTES_IDS.BASE) as User;

	const isGuest = user.role === Role.GUEST;
	const isAdmin = user.role === Role.ADMIN;

	return { ...user, isGuest, isAdmin };
};

export default useUser;
