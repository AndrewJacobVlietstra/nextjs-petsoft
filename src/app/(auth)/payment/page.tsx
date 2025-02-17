import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
	return (
		<main className="flex flex-col items-center gap-y-6">
			<H1>PetSoft access requires payment.</H1>

			<Button>Buy Lifetime Access For $299</Button>
		</main>
	);
}
