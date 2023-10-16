import prisma from "../db";
import { AppEvent, CreateOrUpdateEventBody } from "../constants/event";

const getOne = async (eventId: AppEvent["id"]): Promise<AppEvent> => {
	const event = await prisma.event.findUniqueOrThrow({ where: { id: eventId } });

	return event as AppEvent;
};

const getAll = async (): Promise<AppEvent[]> => {
	const events = await prisma.event.findMany({ orderBy: { endDate: "desc" } });

	return events as AppEvent[];
};

const getActive = async (): Promise<AppEvent[]> => {
	const events = await prisma.event.findMany({
		where: { endDate: { gte: new Date() } },
		orderBy: { endDate: "desc" },
	});

	return events as AppEvent[];
};

const create = async (event: CreateOrUpdateEventBody): Promise<AppEvent> => {
	const createdEvent = await prisma.event.create({ data: event });

	return createdEvent as AppEvent;
};

const updateOne = async (eventId: AppEvent["id"], event: CreateOrUpdateEventBody): Promise<AppEvent> => {
	const updatedEvent = await prisma.event.update({
		where: { id: eventId },
		data: event,
	});

	return updatedEvent as AppEvent;
};

const deleteOne = (eventId: AppEvent["id"]) => prisma.event.delete({ where: { id: eventId } });

const eventService = {
	getOne,
	getAll,
	getActive,
	create,
	updateOne,
	deleteOne,
};

export default eventService;
