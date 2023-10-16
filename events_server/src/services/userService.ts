import prisma from "../db";
import { User } from "../constants/user";

const findUniqueByEmail = (email: User["email"]) =>
	prisma.user.findUnique({
		where: { email },
	});

const findUniqueById = (id: User["id"]) =>
	prisma.user.findUnique({
		where: { id },
		select: { id: true, name: true, email: true, gender: true, role: true },
	});

const userService = {
	findUniqueByEmail,
	findUniqueById,
};

export default userService;
