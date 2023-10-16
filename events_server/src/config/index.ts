import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../..", `.env.${process.env.NODE_ENV}`) });

const config = {
	PORT: process.env.PORT,
	SECRET_KEY: process.env.SECRET_KEY as string,
	SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
	JWT_EXPIRATION_TIME: Number(process.env.JWT_EXPIRATION_TIME),
    BASE_CLIENT_URL: process.env.BASE_CLIENT_URL,
};

export default config;
