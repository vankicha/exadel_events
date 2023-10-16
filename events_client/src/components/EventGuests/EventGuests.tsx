import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { AppEventGuest } from "@constants/user";
import styles from "./EventGuest.module.css";

interface EventGuestsProps {
	guests: AppEventGuest[];
}

const EventGuests = ({ guests }: EventGuestsProps) => {
	return (
		<Col xl={4}>
			<h4 className="mb-4 text-muted">Guests ({guests.length})</h4>
			<Col className={`${styles["event-guest-group"]} border border-light-subtle rounded-1`}>
				<ListGroup>
					{guests.length ? (
						guests.map((guest) => (
							<ListGroup.Item
								className="bg-light border-0 rounded-0"
								key={guest.id}
							>{`${guest.name}`}</ListGroup.Item>
						))
					) : (
						<ListGroup.Item className="border-0 rounded-0">No guests subscribed.</ListGroup.Item>
					)}
				</ListGroup>
			</Col>
		</Col>
	);
};

export default EventGuests;
