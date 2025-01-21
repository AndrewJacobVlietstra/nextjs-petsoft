import { actionType } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type remainingActions = Exclude<actionType, "checkout">;

type PetFormProps = {
	actionType: remainingActions;
};

export default function PetForm({ actionType }: PetFormProps) {
	return (
		<form className="flex flex-col gap-y-4">
			<div className="space-y-1">
				<Label htmlFor="name">Name</Label>
				<Input id="name" type="text" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="ownerName">Owner Name</Label>
				<Input id="ownerName" type="text" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="age">Age</Label>
				<Input id="age" type="number" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="imageUrl">Image URL</Label>
				<Input id="imageUrl" type="text" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="notes">Notes</Label>
				<Textarea id="notes" />
			</div>

			<Button
				className="self-end mt-2"
				type="submit"
				aria-label={actionType === "add" ? "Submit new pet" : "Save pet info"}
				title={actionType === "add" ? "Submit new pet" : "Save pet info"}
			>
				{actionType === "add" ? "Submit" : "Save"}
			</Button>
		</form>
	);
}
