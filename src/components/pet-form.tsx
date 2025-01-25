"use client";

import { actionType } from "@/lib/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";
import { PLACEHOLDER_IMG } from "@/lib/constants";

export type remainingActions = Exclude<actionType, "checkout">;

type PetFormProps = {
	actionType: remainingActions;
	closeDialog: () => void;
};

export default function PetForm({ actionType, closeDialog }: PetFormProps) {
	const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

	return (
		<form
			action={async (formData) => {
				const petData = {
					name: formData.get("name") as string,
					ownerName: formData.get("ownerName") as string,
					age: parseInt(formData.get("age") as string),
					imageUrl: (formData.get("imageUrl") as string) || PLACEHOLDER_IMG,
					notes: formData.get("notes") as string,
				};

				if (actionType === "add") {
					await handleAddPet(petData);
				}
				if (actionType === "edit") {
					await handleEditPet(selectedPet!.id, petData);
				}
			}}
			onSubmit={() => closeDialog()}
			className="flex flex-col gap-y-4"
		>
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

			<PetFormBtn actionType={actionType} />
		</form>
	);
}
