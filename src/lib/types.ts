export type Pet = {
	id: string;
	name: string;
	ownerName: string;
	imageUrl: string;
	age: number;
	notes: string;
};

export type actionType = "add" | "edit" | "checkout";
