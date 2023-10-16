import { createContext, useState } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

interface NotificationProviderProps {
	children: React.ReactNode;
}

interface NotificationContextProps {
	showNotification: (message: string) => void;
}

export type NotificationContextType = NotificationContextProps | undefined;

export const NotificationContext = createContext<NotificationContextType>(undefined);

const NotificationProvider = ({ children }: NotificationProviderProps) => {
	const [notification, setNotification] = useState<string | null>(null);
	const [show, setShow] = useState<boolean>(false);

	const showNotification = (message: string) => {
		setNotification(message);
		setShow(true);
	};

	const hideNotification = () => {
		setShow(false);
		setTimeout(() => {
			setNotification(null);
		}, 100);
	};

	return (
		<NotificationContext.Provider value={{ showNotification }}>
			{children}
			<ToastContainer className="p-3" position="top-center">
				<Toast bg="danger" autohide show={show} onClose={hideNotification}>
					<Toast.Header className="justify-content-between">
						<strong className="mr-auto">Notification</strong>
					</Toast.Header>
					<Toast.Body>{notification}</Toast.Body>
				</Toast>
			</ToastContainer>
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
