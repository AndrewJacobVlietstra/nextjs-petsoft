"use server";

import { PLACEHOLDER_IMG } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(formData: FormData) {
	try {
		await sleep();

		await prisma.pet.create({
			data: {
				name: formData.get("name") as string,
				ownerName: formData.get("ownerName") as string,
				age: parseInt(formData.get("age") as string),
				imageUrl: (formData.get("imageUrl") as string) || PLACEHOLDER_IMG,
				notes: formData.get("notes") as string,
			},
		});
	} catch (error) {
		return {
			message: "Something went wrong! Could not add pet!",
		};
	}

	revalidatePath("/app", "layout");
}

export async function editPet(petId: string, formData: FormData) {
	try {
		await sleep();

		await prisma.pet.update({
			where: {
				id: petId,
			},
			data: {
				name: formData.get("name") as string,
				ownerName: formData.get("ownerName") as string,
				age: parseInt(formData.get("age") as string),
				imageUrl: (formData.get("imageUrl") as string) || PLACEHOLDER_IMG,
				notes: formData.get("notes") as string,
			},
		});
	} catch (error) {
		return {
			message: "Something went wrong! Could not edit pet!",
		};
	}

	revalidatePath("/app", "layout");
}

export async function deletePet(petId: string) {
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
