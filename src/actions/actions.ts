"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { petFormDataSchema } from "@/lib/zod-schemas";
import { PetId } from "@/lib/types";

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

export async function editPet(petId: PetId, petData: unknown) {
	const parsedPet = petFormDataSchema.safeParse(petData);
	if (!parsedPet.success) {
		return {
			message: "Invalid pet data.",
		};
	}

	try {
		await prisma.pet.update({
			where: {
				id: petId,
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

export async function deletePet(petId: PetId) {
	try {
		await prisma.pet.delete({
			where: {
				id: petId,
			},
		});
	} catch (error) {
		return {
			message: "Something went wrong! Could not checkout pet!",
		};
	}

	revalidatePath("/app", "layout");
}
