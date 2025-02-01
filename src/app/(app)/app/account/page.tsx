import H1 from "@/components/h1";
import ContentBlock from "@/components/content-block";
import SignOutButton from "@/components/sign-out-btn";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
	const session = await auth();

	if (!session?.user) {
		return redirect("/login");
	}

	return (
		<main>
			<H1 className="my-8 text-white">Your Account</H1>

			<ContentBlock className="flex flex-col gap-3 justify-center items-center h-[500px]">
				<p>Logged in as: {session.user.email}</p>

				<SignOutButton />
			</ContentBlock>
		</main>
	);
}
