"use client";

import { Button } from "./ui/button";
import { createCheckoutSession } from "@/actions/actions";

export default function PaymentBtn() {
	return (
		<Button
			onClick={async () => {
				await createCheckoutSession();
			}}
		>
			Buy Lifetime Access For $299
		</Button>
	);
}
