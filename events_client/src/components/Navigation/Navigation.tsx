import { Link, useFetcher } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { ROUTES } from "@constants/routes";

const Navigation = () => {
	const fetcher = useFetcher();

	const onLogout = () => {
		fetcher.submit(
			{},
			{
				method: "post",
				action: ROUTES.API_LOGOUT,
			}
		);
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Eventify
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/events">
							Events
						</Nav.Link>
					</Nav>
					<Button variant="light" onClick={onLogout}>
						Logout
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
