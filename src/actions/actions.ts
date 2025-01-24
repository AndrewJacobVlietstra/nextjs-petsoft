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
