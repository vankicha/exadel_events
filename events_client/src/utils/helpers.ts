import { ZodError } from "zod";

export const handleZodError = (error: ZodError) => {
	const errors = error.errors.reduce((acc, e) => ({ ...acc, [e.path[0]]: e.message }), {});
	return errors;
};
