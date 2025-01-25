export type Pet = {
	id: string;
	name: string;
	ownerName: string;
	imageUrl: string;
	age: number;
	notes: string;
};

export type PetFormData = Omit<Pet, "id">;

export type actionType = "add" | "edit" | "checkout";

export type actionError = { message: string } | undefined;
