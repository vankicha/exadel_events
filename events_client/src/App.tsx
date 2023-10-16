import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from "react-router-dom";
import Main from "@layouts/Main";
import Register from "@pages/Register";
import Login from "@pages/Login";
import Events from "@pages/Events";
import Event from "@pages/Event";
import Error from "@components/Error";
import NotificationProvider, { NotificationContext, NotificationContextType } from "@contexts/NotificationContext";
import { getUser, getEvents, getEvent, redirectAuthorizedUser } from "@utils/loaders";
import { register, login, logout, createEvent, editEvent, deleteEvent, subscribe, unsubscribe } from "@utils/actions";
import { ROUTES, ROUTES_IDS } from "@constants/routes";

const router = (contextValue: NotificationContextType) =>
	createBrowserRouter(
		createRoutesFromElements(
			<Route errorElement={<Error />}>
				<Route
					path={ROUTES.REGISTER}
					element={<Register />}
					action={register(contextValue)}
					loader={redirectAuthorizedUser}
				/>
				<Route
					path={ROUTES.LOGIN}
					element={<Login />}
					action={login(contextValue)}
					loader={redirectAuthorizedUser}
				/>
				<Route path={ROUTES.BASE} element={<Main />} loader={getUser} id={ROUTES_IDS.BASE}>
					<Route index element={<Navigate to={ROUTES.EVENTS} />} />
					<Route path={ROUTES.EVENTS} element={<Events />} loader={getEvents} />
					<Route path={ROUTES.EVENT} element={<Event />} loader={getEvent} />
				</Route>
				<Route path={ROUTES.API}>
					<Route path={ROUTES.API_CREATE_EVENT} action={createEvent} />
					<Route path={ROUTES.API_EDIT_EVENT} action={editEvent} />
					<Route path={ROUTES.API_DELETE_EVENT} action={deleteEvent} />
					<Route path={ROUTES.API_SUBSCRIBE} action={subscribe} />
					<Route path={ROUTES.API_UNSUBSCRIBE} action={unsubscribe} />
					<Route path={ROUTES.API_LOGOUT} action={logout} />
				</Route>
			</Route>
		)
	);

const App = () => (
	<NotificationProvider>
		<NotificationContext.Consumer>
			{(contextValue) => <RouterProvider router={router(contextValue)} />}
		</NotificationContext.Consumer>
	</NotificationProvider>
);

export default App;
