import bcrypt from "bcrypt";
import prisma from "../db";
import config from "../config";
import { RegisterBody, User } from "../constants/user";

const register = async ({ password, ...rest }: RegisterBody): Promise<User> => {
	const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);

	const user = await prisma.user.create({
		data: { ...rest, password: hashedPassword },
		select: { id: true, name: true, email: true, gender: true, role: true },
	});

	return user as User;
};

const authService = {
	register,
};

export default authService;
