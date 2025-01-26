import { remainingActions } from "./pet-form";
import { Button } from "./ui/button";

type PetFormBtnProps = {
	actionType: remainingActions;
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
	const btnData = actionType === "add" ? "Submit new pet" : "Save pet info";

	return (
		<Button
			className="self-end mt-2"
			type="submit"
			aria-label={btnData}
			title={btnData}
		>
			{actionType === "add" ? "Submit" : "Save"}
		</Button>
	);
}
