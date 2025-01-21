import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type PetButtonProps = {
	children: React.ReactNode;
	actionType: "add" | "edit" | "checkout";
	onClick?: () => void;
};

export default function PetButton({
	children,
	actionType,
	onClick,
}: PetButtonProps) {
	if (actionType === "add") {
		return (
			<Button size="icon" aria-label="Add a pet" title="Add a pet">
				<PlusIcon className="h-6 w-6" />
			</Button>
		);
	}

	if (actionType === "edit") {
		return (
			<Button variant="secondary" aria-label="Edit a pet" title="Edit pet info">
				{children}
			</Button>
		);
	}

	if (actionType === "checkout") {
		return (
			<Button
				variant="destructive"
				aria-label="Checkout a pet"
				title="Remove pet from system"
				onClick={onClick}
			>
				{children}
			</Button>
		);
	}
}
