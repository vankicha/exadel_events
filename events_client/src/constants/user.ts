export enum Role {
	ADMIN = "ADMIN",
	GUEST = "GUEST",
}

export type Gender = "MALE" | "FEMALE" | "EMPTY";

export type User = {
	id: string;
	name: string;
	email: string;
	gender: Gender;
	role: Role;
};

export type AppEventGuest = Pick<User, "id" | "name">;
