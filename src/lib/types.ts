import { Pet as PetType } from "@prisma/client";

export type Pet = PetType;

export type PetId = Pet["id"];

export type PetFormData = Omit<
	Pet,
	"id" | "userId" | "createdAt" | "updatedAt"
>;

export type actionType = "add" | "edit" | "checkout";

export type actionError = { message: string } | undefined;

export type AuthFormTypes = "login" | "signup";
