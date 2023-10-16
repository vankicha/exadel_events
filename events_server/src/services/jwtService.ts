import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "../constants/user";

const generate = ({ id, role }: { id: User["id"]; role: User["role"] }) =>
	jwt.sign({ id, role }, config.SECRET_KEY, { expiresIn: config.JWT_EXPIRATION_TIME });

const jwtService = {
	generate,
};

export default jwtService;
