import { useLoaderData } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import EventDetails from "@components/EventDetails";
import EventGuests from "@components/EventGuests";
// import Mapbox from "@components/Mapbox";
import useUser from "@hooks/useUser";
import { GetEventData } from "@utils/loaders";

const Event = () => {
	const { isAdmin } = useUser();
	const { event, isSubscribed, guests } = useLoaderData() as GetEventData;

	return (
		<Container className="p-0">
			<Row className="gap-xl-0 gap-4">
				<EventDetails event={event} isSubscribed={isSubscribed} />
				{isAdmin && <EventGuests guests={guests!} />}
			</Row>
			{!event.isOnline && (
				<Row className="mt-5">
					{/* <Mapbox location={event.address} /> */}
				</Row>
			)}
		</Container>
	);
};

export default Event;
