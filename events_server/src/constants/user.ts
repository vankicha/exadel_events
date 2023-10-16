export enum Role {
	ADMIN = "ADMIN",
	GUEST = "GUEST",
}

export type Gender = "MALE" | "FEMALE" | "EMPTY";

export type RegisterBody = {
	name: string;
	email: string;
	password: string;
	role?: Role;
	gender?: Gender;
};

export type LoginBody = {
	email: string;
	password: string;
};

export type User = {
	id: string;
	name: string;
	email: string;
	gender: Gender;
	role: Role;
};

export type AuthBody = {
	authUser: {
		id: User["id"];
		role: User["role"];
	};
};

export type JWTPayloadIdToken = { id: User["id"]; role: User["role"]; iat: number; exp: number };

export const ID_TOKEN_COOKIE = "id_token";

export type AppEventGuest = Pick<User, "id" | "name">;
