import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { actionError } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const sleep = async (delay = 1000) => {
	await new Promise((resolve) => setTimeout(resolve, delay));
};

export const handleActionError = (error: actionError) => {
	if (!error) return;

	if (error) {
		toast.warning(error.message);
		return;
	}
};
