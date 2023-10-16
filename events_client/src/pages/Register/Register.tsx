import { Form as ReactRouterForm, useActionData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { RegisterSchema } from "@constants/validationSchema";

const Register = () => {
	const errors = useActionData() as RegisterSchema;

	return (
		<Container>
			<Row className="vh-100 d-flex justify-content-center align-items-center">
				<Col xs={12} sm={10} md={8} lg={6}>
					<h1 className="text-center">Register</h1>
					<ReactRouterForm method="post" id="register-form">
						<FloatingLabel label="Name" className="mb-3">
							<Form.Control type="text" name="name" />
							<Form.Text className="text-danger">{errors?.name}</Form.Text>
						</FloatingLabel>
						<FloatingLabel label="Email address" className="mb-3">
							<Form.Control type="email" name="email" />
							<Form.Text className="text-danger">{errors?.email}</Form.Text>
						</FloatingLabel>
						<FloatingLabel label="Password" className="mb-3">
							<Form.Control type="password" name="password" />
							<Form.Text className="text-danger">{errors?.password}</Form.Text>
						</FloatingLabel>
						<Button size="lg" className="d-flex m-auto" type="submit">
							Sign Up
						</Button>
					</ReactRouterForm>
				</Col>
			</Row>
		</Container>
	);
};

export default Register;
