export type AppEventType = "Hiring week" | "Internship" | "Meetup" | "Training";

export type AppEvent = {
	id: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	description: string;
	type: AppEventType;
	startDate: string;
	endDate: string;
	isOnline: boolean;
	address?: string;
};

export const APP_EVENT_TYPES: { [key: string]: AppEventType } = {
	HIRING_WEEK: "Hiring week",
	INTERNSHIP: "Internship",
	MEETUP: "Meetup",
	TRAINING: "Training",
};
