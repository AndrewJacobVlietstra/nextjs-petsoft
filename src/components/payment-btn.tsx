"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { createCheckoutSession } from "@/actions/actions";

export default function PaymentBtn() {
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			onClick={() => startTransition(async () => await createCheckoutSession())}
			disabled={isPending}
		>
			{isPending ? "Loading..." : "Buy Lifetime Access For $299"}
		</Button>
	);
}
