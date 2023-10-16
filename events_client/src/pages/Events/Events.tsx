import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import EventCard from "@components/EventCard";
import EventModal from "@components/EventModal";
import useUser from "@hooks/useUser";
import { AppEvent } from "@constants/event";
import { MODAL_MODES } from "@constants/modal";

const Events = () => {
	const { isAdmin } = useUser();
	const events = useLoaderData() as AppEvent[];

	const [show, setShow] = useState(false);

	const onEventModalShow = () => setShow(true);
	const onEventModalHide = () => setShow(false);

	return (
		<Row className="gap-4">
			<Container className="d-flex justify-content-between align-items-center">
				<h2 className="m-0">Event List</h2>
				{isAdmin && <Button onClick={onEventModalShow}>Add Event</Button>}
			</Container>
			<Container>
				<Row lg={3} md={2} sm={1} xs={1}>
					{events.map((event) => {
						return (
							<Col className="mb-4" key={event.id}>
								<EventCard event={event} />
							</Col>
						);
					})}
				</Row>
			</Container>

			<EventModal show={show} mode={MODAL_MODES.CREATE} onHide={onEventModalHide} />
		</Row>
	);
};

export default Events;
