"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { petFormDataSchema, petIdSchema } from "@/lib/zod-schemas";
import { signIn, signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";

// --- User Actions ---
export async function login(formData: FormData) {
	const authData = Object.fromEntries(formData.entries());
	await signIn("credentials", authData);
}

export async function logout() {
	await signOut({ redirect: true, redirectTo: "/" });
}

export async function signup(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = {
		email,
		hashedPassword,
	};

	await prisma.user.create({
		data: newUser,
	});

	await signIn("credentials", formData);
}

//  --- Pet Actions ---
export async function addPet(petData: unknown) {
	const parsedPet = petFormDataSchema.safeParse(petData);
	if (!parsedPet.success) {
		return {
			message: "Invalid pet data.",
		};
	}

	try {
		await prisma.pet.create({
			data: parsedPet.data,
		});
	} catch (error) {
		return {
			message: `Something went wrong! Could not add pet!`,
		};
	}

	revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, petData: unknown) {
	const parsedId = petIdSchema.safeParse(petId);
	const parsedPet = petFormDataSchema.safeParse(petData);
	if (!parsedId.success || !parsedPet.success) {
		return {
			message: "Invalid pet data.",
		};
	}

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
	const parsedId = petIdSchema.safeParse(petId);
	if (!parsedId.success) {
		return {
			message: "Invalid pet ID.",
		};
	}

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
