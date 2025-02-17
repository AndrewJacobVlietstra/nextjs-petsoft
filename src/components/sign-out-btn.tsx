"use client";

import { logout } from "@/actions/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

export default function SignOutButton() {
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			onClick={() => startTransition(async () => await logout())}
			disabled={isPending}
		>
			Sign Out
		</Button>
	);
}
