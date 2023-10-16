export const convertUTCToLocal = (utcDateString: string) => {
	const utcDate = new Date(utcDateString);
	const localTimezoneOffset = utcDate.getTimezoneOffset();
	const localDate = new Date(utcDate.getTime() - localTimezoneOffset * 60 * 1000);
	return localDate.toISOString().slice(0, -1);
};

export const formatDateString = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
};
