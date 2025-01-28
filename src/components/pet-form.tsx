"use client";

import { actionType, PetFormData } from "@/lib/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { useForm } from "react-hook-form";
import { petFormDataSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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
		getValues,
		formState: { errors },
	} = useForm<PetFormData>({
		resolver: zodResolver(petFormDataSchema),
		defaultValues: {
			name: actionType === "edit" ? selectedPet?.name : "",
			ownerName: actionType === "edit" ? selectedPet?.ownerName : "",
			age: actionType === "edit" ? selectedPet?.age : "",
			imageUrl: actionType === "edit" ? selectedPet?.imageUrl : "",
			notes: actionType === "edit" ? selectedPet?.notes : "",
		},
	});

	return (
		<form
			action={async () => {
				const result = await trigger(); // Checking form data from client against zod schema
				if (!result) return;

				closeDialog();

				const petData = getValues();

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
				<Input id="name" {...register("name")} />
				{errors.name && <p className="text-red-500">{errors.name.message}</p>}
			</div>

			<div className="space-y-1">
				<Label htmlFor="ownerName">Owner Name</Label>
				<Input id="ownerName" {...register("ownerName")} />
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
