import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { formatDateString } from "@utils/date";
import type { AppEvent } from "@constants/event";
import { ROUTES } from "@constants/routes";
import styles from "./EventCard.module.css";

interface EventCardProps {
	event: AppEvent;
}

const EventCard = ({ event }: EventCardProps) => {
	return (
		<Card
			className={`${styles.card} border-0 shadow h-100 text-decoration-none`}
			key={event.id}
			as={Link}
			to={ROUTES.EVENT.replace(":eventId", event.id)}
		>
			<Card.Body>
				<Card.Title className="text-primary h5 mb-3">{event.title}</Card.Title>
				<Card.Subtitle className="mb-3 text-muted">{event.type}</Card.Subtitle>
				<Card.Text className={`${styles["card__text--with-icon"]} d-flex gap-2 align-items-center mb-3`}>
					<FontAwesomeIcon className="text-muted" icon={faCalendarDay} />
					<span className="font-italic">Start: {formatDateString(event.startDate)}</span>
				</Card.Text>
				<Card.Text className={`${styles["card__text--with-icon"]} d-flex gap-2 align-items-center mb-3`}>
					<FontAwesomeIcon className="text-muted" icon={faCalendarDay} />
					<span className="font-italic">End: {formatDateString(event.endDate)}</span>
				</Card.Text>
				<Card.Text className={`${styles["card__text--with-icon"]} d-flex gap-2 align-items-center`}>
					{event.isOnline ? (
						<>
							<FontAwesomeIcon className="text-muted" icon={faMapMarkedAlt} />
							<span className="font-italic">Online</span>
						</>
					) : (
						<>
							<FontAwesomeIcon className="text-muted" icon={faMapMarkedAlt} />
							<span className="font-italic">{event.address}</span>
						</>
					)}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default EventCard;
