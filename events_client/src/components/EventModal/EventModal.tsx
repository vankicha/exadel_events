import React, { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useForm from "@hooks/useForm";
import { convertUTCToLocal } from "@utils/date";
import { ROUTES } from "@constants/routes";
import { AppEvent, APP_EVENT_TYPES } from "@constants/event";
import { MODAL_MODES, type ModalMode } from "@constants/modal";
import { EventSchema } from "@constants/validationSchema";

interface EventModalProps {
	show: boolean;
	mode: ModalMode;
	onHide: () => void;
	initialValues?: AppEvent;
}

const EventModal = ({ show, mode, onHide, initialValues }: EventModalProps) => {
	const fetcher = useFetcher();
	const { values, handleInputChange, handleCheckboxChange, handleSelectChange } = useForm<AppEvent>(initialValues);
	const errors = fetcher.data as EventSchema;

	const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		fetcher.submit(event.currentTarget.form, {
			method: "post",
			action:
				mode === MODAL_MODES.CREATE
					? ROUTES.API_CREATE_EVENT
					: ROUTES.API_EDIT_EVENT.replace(":eventId", initialValues!.id),
		});
	};

	useEffect(() => {
		if (fetcher.data?.hide && fetcher.formData) {
			onHide();
		}
	}, [fetcher.data, fetcher.formData, onHide]);

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Add Event</Modal.Title>
			</Modal.Header>
			<fetcher.Form>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							name="title"
							value={values?.title || ""}
							onChange={handleInputChange}
						/>
						<Form.Text className="text-danger">{errors?.title}</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={2}
							name="description"
							value={values?.description || ""}
							onChange={handleInputChange}
						/>
						<Form.Text className="text-danger">{errors?.description}</Form.Text>
					</Form.Group>
					<Form.Group className="mb-1">
						<Form.Label>Address</Form.Label>
						<Form.Control
							type="text"
							name="address"
							value={values?.address || ""}
							disabled={values?.isOnline}
							onChange={handleInputChange}
						/>
						<Form.Text className="text-danger">{errors?.address}</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Check
							type="checkbox"
							label="Online"
							name="isOnline"
							checked={values?.isOnline || false}
							onChange={handleCheckboxChange}
						/>
						<Form.Text className="text-danger">{errors?.isOnline}</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Type</Form.Label>
						<Form.Select value={values?.type || "1"} name="type" onChange={handleSelectChange}>
							<option value="1">Select a type</option>
							{Object.values(APP_EVENT_TYPES).map((eventType) => (
								<option key={eventType} value={eventType}>
									{eventType}
								</option>
							))}
						</Form.Select>
						<Form.Text className="text-danger">{errors?.type}</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Start Date</Form.Label>
						<Form.Control
							type="datetime-local"
							name="startDate"
							value={values?.startDate ? convertUTCToLocal(values?.startDate) : ""}
							onChange={handleInputChange}
						/>
						<Form.Text className="text-danger">{errors?.startDate}</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>End Date</Form.Label>
						<Form.Control
							type="datetime-local"
							name="endDate"
							value={values?.endDate ? convertUTCToLocal(values?.endDate) : ""}
							onChange={handleInputChange}
						/>
						<Form.Text className="text-danger">{errors?.endDate}</Form.Text>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onHide}>
						Close
					</Button>
					<Button onClick={onSubmit}>Submit</Button>
				</Modal.Footer>
			</fetcher.Form>
		</Modal>
	);
};

export default EventModal;
