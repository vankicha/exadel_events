export type AppEventType = "Hiring week" | "Internship" | "Meetup" | "Training";

export type AppEvent = {
	id: string;
	title: string;
	createdAt: Date;
	updatedAt: Date;
	description: string;
	type: AppEventType;
	startDate: Date;
	endDate: Date;
	isOnline: boolean;
	address?: string;
};

export type CreateOrUpdateEventBody = Omit<AppEvent, "id" | "createdAt" | "updatedAt">;

export const APP_EVENT_TYPES: { [key: string]: AppEventType } = {
	HIRING_WEEK: "Hiring week",
	INTERNSHIP: "Internship",
	MEETUP: "Meetup",
	TRAINING: "Training",
};
