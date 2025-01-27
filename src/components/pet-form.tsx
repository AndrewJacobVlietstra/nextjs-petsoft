"use client";

import { actionType, PetFormData } from "@/lib/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { PLACEHOLDER_IMG } from "@/lib/constants";
import { useForm } from "react-hook-form";
import PetFormBtn from "./pet-form-btn";

export type remainingActions = Exclude<actionType, "checkout">;

type PetFormProps = {
	actionType: remainingActions;
	closeDialog: () => void;
};

export default function PetForm({ actionType, closeDialog }: PetFormProps) {
	const { selectedPet, handleAddPet, handleEditPet } = usePetContext();
	const {
		register,
		trigger,
		formState: { errors },
	} = useForm<PetFormData>();

	return (
		<form
			action={async (formData) => {
				const result = await trigger();
				if (!result) return;

				closeDialog();

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
			className="flex flex-col gap-y-4"
		>
			<div className="space-y-1">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					{...register("name", {
						required: "Name is required.",
						maxLength: {
							value: 30,
							message: "Name has a maximum of 30 characters long.",
						},
					})}
				/>
				{errors.name && <p className="text-red-500">{errors.name.message}</p>}
			</div>

			<div className="space-y-1">
				<Label htmlFor="ownerName">Owner Name</Label>
				<Input
					id="ownerName"
					{...register("ownerName", {
						required: "Owner Name is required.",
						maxLength: {
							value: 30,
							message: "Owner Name has a maximum of 30 characters long.",
						},
					})}
				/>
				{errors.ownerName && (
					<p className="text-red-500">{errors.ownerName.message}</p>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="age">Age</Label>
				<Input id="age" {...register("age")} />
				{errors.age && <p className="text-red-500">{errors.age.message}</p>}
			</div>

			<div className="space-y-1">
				<Label htmlFor="imageUrl">Image URL</Label>
				<Input id="imageUrl" {...register("imageUrl")} />
				{errors.imageUrl && (
					<p className="text-red-500">{errors.imageUrl.message}</p>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="notes">Notes</Label>
				<Textarea id="notes" {...register("notes")} rows={3} />
				{errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
			</div>

			<PetFormBtn actionType={actionType} />
		</form>
	);
}
