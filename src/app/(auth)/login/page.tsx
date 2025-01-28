import AuthForm from "@/components/auth-form";
import Link from "next/link";
import H1 from "@/components/h1";

export default function LoginPage() {
	return (
		<main className="flex flex-col justify-center items-center gap-y-4">
			<H1>Log In</H1>

			<AuthForm />

			<p>
				No account yet?{" "}
				<Link
					href="/signup"
					className="font-medium text-zinc-500 hover:text-zinc-600 transition"
				>
					Sign up
				</Link>
				.
			</p>
		</main>
	);
}
