import { useState } from "react";
import { useFetcher } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import EventModal from "../EventModal";
import useUser from "@hooks/useUser";
import { formatDateString } from "@/utils/date";
import type { AppEvent } from "@constants/event";
import { MODAL_MODES } from "@constants/modal";
import { ROUTES } from "@constants/routes";
import styles from "./EventDetails.module.css";

interface EventDetailsProps {
	event: AppEvent;
	isSubscribed: boolean;
}

const EventDetails = ({ event, isSubscribed }: EventDetailsProps) => {
	const [show, setShow] = useState(false);

	const fetcher = useFetcher();
	const { id: userId, isGuest, isAdmin } = useUser();
	const isEventInThePast = new Date(event.endDate) < new Date();

	const onEventModalShow = () => setShow(true);
	const onEventModalHide = () => setShow(false);

	const onEventDelete = () => {
		fetcher.submit(
			{},
			{
				method: "post",
				action: ROUTES.API_DELETE_EVENT.replace(":eventId", event.id),
			}
		);
	};

	const onEventSubscribe = () => {
		fetcher.submit(
			{},
			{
				method: "post",
				action: ROUTES.API_SUBSCRIBE.replace(":userId", userId).replace(":eventId", event.id),
			}
		);
	};

	const onEventUnsubscribe = () => {
		fetcher.submit(
			{},
			{
				method: "post",
				action: ROUTES.API_UNSUBSCRIBE.replace(":userId", userId).replace(":eventId", event.id),
			}
		);
	};

	return (
		<>
			<Col xl={8} className="d-flex flex-column">
				<h2 className="mb-2 text-primary">{event.title}</h2>
				<h5 className="mb-4 text-muted">{event.type}</h5>
				<Row className="mb-3">
					<Col className={`${styles["col--with-icon"]} d-flex gap-2 align-items-center`}>
						<FontAwesomeIcon icon={faCalendarDay} className="text-muted" />
						<span>Start: {formatDateString(event.startDate)}</span>
					</Col>
				</Row>
				<Row className="mb-3">
					<Col className={`${styles["col--with-icon"]} d-flex gap-2 align-items-center`}>
						<FontAwesomeIcon icon={faCalendarDay} className="text-muted" />
						<span>End: {formatDateString(event.endDate)}</span>
					</Col>
				</Row>
				<Row className="mb-3">
					<Col className={`${styles["col--with-icon"]} d-flex gap-2 align-items-center`}>
						<FontAwesomeIcon icon={faMapMarkedAlt} className="text-muted" />
						{event.isOnline ? "Online" : `${event.address}`}
					</Col>
				</Row>
				<Row className="mb-4">
					<Col>
						<Card>
							<Card.Body>
								<Card.Text>{event.description}</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				<Row className="mt-auto justify-content-center align-items-end">
					<Col lg={4} md={6} sm={6} className="d-flex gap-2 justify-content-center">
						{isAdmin && (
							<>
								<Col>
									<Button className="w-100" variant="danger" onClick={onEventDelete}>
										Delete
									</Button>
								</Col>
								<Col>
									<Button className="w-100" onClick={onEventModalShow}>
										Edit
									</Button>
								</Col>
							</>
						)}
						{isGuest && (
							<Col>
								{isEventInThePast ? (
									<p className="text-muted text-center">This event has ended!</p>
								) : isSubscribed ? (
									<Button className="w-100" variant="secondary" onClick={onEventUnsubscribe}>
										Unsubscribe
									</Button>
								) : (
									<Button className="w-100" onClick={onEventSubscribe}>
										Subscribe
									</Button>
								)}
							</Col>
						)}
					</Col>
				</Row>
			</Col>

			<EventModal show={show} mode={MODAL_MODES.EDIT} onHide={onEventModalHide} initialValues={event} />
		</>
	);
};

export default EventDetails;
