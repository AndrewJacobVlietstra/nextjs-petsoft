import H1 from "@/components/h1";
import PaymentBtn from "@/components/payment-btn";

type SearchParams = { [key: string]: string | string[] | undefined };

type PaymentPageProps = {
	searchParams: SearchParams;
};

export default function PaymentPage({ searchParams }: PaymentPageProps) {
	return (
		<main className="flex flex-col items-center gap-y-6">
			<H1>PetSoft access requires payment.</H1>

			{!searchParams.success && <PaymentBtn />}

			{searchParams.success && (
				<p className="text-lg font-semibold text-green-500">
					Payment Successful! You now have lifetime access to PetSoft.
				</p>
			)}

			{searchParams.cancelled && (
				<p className="text-lg font-semibold text-red-500">
					Payment cancelled. You can try again.
				</p>
			)}
		</main>
	);
}
