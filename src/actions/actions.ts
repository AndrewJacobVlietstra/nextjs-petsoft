"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
	authFormDataSchema,
	petFormDataSchema,
	petIdSchema,
} from "@/lib/zod-schemas";
import { signIn, signOut } from "@/lib/auth";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

// --- User Actions ---
export async function login(prevState: unknown, formData: unknown) {
	// Validate the input is of FormData shape
	if (!(formData instanceof FormData)) {
		return {
			message: "Invalid credentials.",
		};
	}

	// Call signIn method with FormData object
	try {
		// If signIn successful nextJS will run redirect automatically
		await signIn("credentials", formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin": {
					return {
						message: "Invalid credentials.",
					};
				}
				default: {
					return {
						message: "There was a problem signing in.",
					};
				}
			}
		}

		throw error; // NextJS redirect throws error, so we need to re-throw it
	}
}

export async function logout() {
	await signOut({ redirect: true, redirectTo: "/" });
}

export async function signup(prevState: unknown, formData: unknown) {
	// Validate the input is of FormData shape
	if (!(formData instanceof FormData)) {
		return {
			message: "Invalid form data.",
		};
	}

	// Convert formData to plain object
	const formDataEntries = Object.fromEntries(formData.entries());

	// Zod validation
	const parsedAuthData = authFormDataSchema.safeParse(formDataEntries);
	if (!parsedAuthData.success) {
		return {
			message: "Invalid credentials.",
		};
	}

	const { email, password } = parsedAuthData.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = {
		email,
		hashedPassword,
	};

	try {
		await prisma.user.create({
			data: newUser,
		});
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return {
					message: "Email already exists.",
				};
			}
		}
		return {
			message: "Could not create user.",
		};
	}

	await signIn("credentials", formData);
}

//  --- Pet Actions ---
export async function addPet(petData: unknown) {
	// Authentication check
	const session = await checkAuth();

	// Validation
	const parsedPet = petFormDataSchema.safeParse(petData);
	if (!parsedPet.success) {
		return {
			message: "Invalid pet data.",
		};
	}

	// Database mutation
	try {
		await prisma.pet.create({
			data: {
				...parsedPet.data,
				user: {
					connect: {
						id: session.user.id,
					},
				},
			},
		});
	} catch (error) {
		return {
			message: `Something went wrong! Could not add pet!`,
		};
	}

	revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, petData: unknown) {
	// Authentication check
	const session = await checkAuth();

	// Validation
	const parsedId = petIdSchema.safeParse(petId);
	const parsedPet = petFormDataSchema.safeParse(petData);
	if (!parsedId.success || !parsedPet.success) {
		return {
			message: "Invalid pet data.",
		};
	}

	// Authorization check
	const pet = await getPetById(parsedId.data);

	if (!pet) {
		return {
			message: "Pet not found.",
		};
	}

	if (pet.userId !== session.user.id) {
		return {
			message: "User not authorized.",
		};
	}

	// Database mutation
	try {
		await prisma.pet.update({
			where: {
				id: parsedId.data,
			},
			data: parsedPet.data,
		});
	} catch (error) {
		return {
			message: "Something went wrong! Could not edit pet!",
		};
	}

	revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
	// Authentication check
	const session = await checkAuth();

	// Validation
	const parsedId = petIdSchema.safeParse(petId);
	if (!parsedId.success) {
		return {
			message: "Invalid pet ID.",
		};
	}

	// Authorization check (user owns pet)
	const pet = await getPetById(parsedId.data);

	if (!pet) {
		return {
			message: "Pet not found.",
		};
	}

	if (pet.userId !== session.user.id) {
		return {
			message: "User not authorized.",
		};
	}

	// Database mutation
	try {
		await prisma.pet.delete({
			where: {
				id: parsedId.data,
			},
		});
	} catch (error) {
		return {
			message: "Something went wrong! Could not checkout pet!",
		};
	}

	revalidatePath("/app", "layout");
}
