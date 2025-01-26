"use server";

import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { PetId, PetFormData } from "@/lib/types";

export async function addPet(petData: PetFormData) {
	try {
		await sleep();

		await prisma.pet.create({
			data: petData,
		});
	} catch (error) {
		return {
			message: "Something went wrong! Could not add pet!",
		};
	}

	revalidatePath("/app", "layout");
}

export async function editPet(petId: PetId, petData: PetFormData) {
	try {
		await sleep();

		await prisma.pet.update({
			where: {
				id: petId,
			},
			data: petData,
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
		await sleep();

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
