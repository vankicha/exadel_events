import prisma from "../db";
import { AppEventGuest, User } from "../constants/user";
import { AppEvent } from "../constants/event";

const subscribe = async (userId: User["id"], eventId: AppEvent["id"]) =>
	prisma.eventGuest.create({ data: { userId, eventId } });

const unsubscribe = async (userId: User["id"], eventId: AppEvent["id"]) =>
	prisma.eventGuest.deleteMany({ where: { userId, eventId } });

const getSubscription = async (userId: User["id"], eventId: AppEvent["id"]) =>
	prisma.eventGuest.findFirst({ where: { userId, eventId } });

const getEventGuests = async (eventId: AppEvent["id"]) => {
	const eventGuests = await prisma.eventGuest.findMany({
		where: { eventId },
		include: {
			User: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	const formattedEventGuests: AppEventGuest[] = eventGuests.map((eventGuest) => ({
		id: eventGuest.User.id,
		name: eventGuest.User.name,
	}));

	return formattedEventGuests;
};

const eventGuestService = {
	subscribe,
	unsubscribe,
	getSubscription,
	getEventGuests,
};

export default eventGuestService;
