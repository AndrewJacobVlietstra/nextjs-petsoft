import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { actionType } from "@/lib/types";

type PetButtonProps = {
	children: React.ReactNode;
	actionType: actionType;
	onClick?: () => void;
};

export default function PetButton({
	children,
	actionType,
	onClick,
}: PetButtonProps) {
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

	return (
		<Dialog>
			<DialogTrigger asChild>
				{actionType === "add" ? (
					<Button size="icon" aria-label="Add a pet" title="Add a pet">
						<PlusIcon className="h-6 w-6" />
					</Button>
				) : (
					<Button
						variant="secondary"
						aria-label="Edit a pet"
						title="Edit pet info"
					>
						{children}
					</Button>
				)}
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle className="pb-2">
						{actionType === "add" ? "Add New Pet" : "Edit Pet Info"}
					</DialogTitle>
				</DialogHeader>
				<PetForm actionType={actionType} />
			</DialogContent>
		</Dialog>
	);
}
