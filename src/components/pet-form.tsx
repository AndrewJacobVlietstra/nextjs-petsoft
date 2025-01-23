"use client";

import { actionType } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { PLACEHOLDER_IMG } from "@/lib/constants";

type remainingActions = Exclude<actionType, "checkout">;

type PetFormProps = {
	actionType: remainingActions;
	onFormSubmit: () => void;
};

export default function PetForm({ actionType, onFormSubmit }: PetFormProps) {
	const { handleAddPet, handleEditPet, selectedPet, selectedPetId } =
		usePetContext();

	const btnData = actionType === "add" ? "Submit new pet" : "Save pet info";

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const newPet = {
			name: formData.get("name") as string,
			ownerName: formData.get("ownerName") as string,
			age: +(formData.get("age") as string),
			imageUrl: (formData.get("imageUrl") as string) || PLACEHOLDER_IMG,
			notes: formData.get("notes") as string,
		};

		if (actionType === "add") handleAddPet(newPet);
		if (actionType === "edit") handleEditPet(selectedPetId!, newPet);

		onFormSubmit(); // close the dialog on form submit
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
			<div className="space-y-1">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					name="name"
					type="text"
					required
					defaultValue={actionType === "edit" ? selectedPet?.name : ""}
				/>
			</div>

			<div className="space-y-1">
				<Label htmlFor="ownerName">Owner Name</Label>
				<Input
					id="ownerName"
					name="ownerName"
					type="text"
					required
					defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
				/>
			</div>

			<div className="space-y-1">
				<Label htmlFor="age">Age</Label>
				<Input
					id="age"
					name="age"
					type="number"
					required
					defaultValue={actionType === "edit" ? selectedPet?.age : ""}
				/>
			</div>

			<div className="space-y-1">
				<Label htmlFor="imageUrl">Image URL</Label>
				<Input
					id="imageUrl"
					name="imageUrl"
					type="text"
					defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
				/>
			</div>

			<div className="space-y-1">
				<Label htmlFor="notes">Notes</Label>
				<Textarea
					id="notes"
					name="notes"
					rows={3}
					required
					defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
				/>
			</div>

			<Button
				className="self-end mt-2"
				type="submit"
				aria-label={btnData}
				title={btnData}
			>
				{actionType === "add" ? "Submit" : "Save"}
			</Button>
		</form>
	);
}
