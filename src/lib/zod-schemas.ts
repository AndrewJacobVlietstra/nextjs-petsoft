import { z } from "zod";
import { PLACEHOLDER_IMG } from "./constants";

export const petIdSchema = z.string().trim().cuid();

export const petFormDataSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(1, { message: "Name is required." })
			.max(20, { message: "Name has 20 max character limit." }),
		ownerName: z
			.string()
			.trim()
			.min(1, { message: "Owner Name is required." })
			.max(20, { message: "Owner Name has 20 max character limit." }),
		age: z.coerce
			.number({ invalid_type_error: "Must be a number." })
			.int({ message: "Age must be an integer / whole number." })
			.positive({ message: "Age must be positive." })
			.max(100, { message: "Age cannot exceed 100." }),
		imageUrl: z.union([
			z.literal(""),
			z.string().url({ message: "Must be a valid image URL." }),
		]),
		notes: z.union([
			z.literal(""),
			z
				.string()
				.trim()
				.max(500, { message: "Notes has 500 max character limit." }),
		]),
	})
	.transform((petFormData) => ({
		...petFormData,
		imageUrl: petFormData.imageUrl || PLACEHOLDER_IMG,
	}));

type zodPetFormData = z.infer<typeof petFormDataSchema>;

export const authFormDataSchema = z.object({
	email: z.string().email().max(100),
	password: z.string().max(100),
});
