"use client";

import { AuthFormTypes } from "@/lib/types";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthFormBtnProps = {
	type: AuthFormTypes;
};

export default function AuthFormBtn({ type }: AuthFormBtnProps) {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending}>
			{type === "login" ? "Log In" : "Sign Up"}
		</Button>
	);
}
