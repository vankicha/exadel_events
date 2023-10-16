import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "@components/Navigation";

const Main = () => {
	return (
		<div>
			<Navigation />
			<Container className="mt-4">
				<Outlet />
			</Container>
		</div>
	);
};

export default Main;
