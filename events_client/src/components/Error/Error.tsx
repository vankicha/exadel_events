import { useRouteError } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Error = () => {
	const error = useRouteError() as { statusText: string };

	return (
		<Container fluid className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
			<Row>
				<Col className="text-center">
					<div>
						<h1>Oops!</h1>
						<p>Sorry, an unexpected error has occurred.</p>
						<p>
							<i>{error.statusText}</i>
						</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Error;
