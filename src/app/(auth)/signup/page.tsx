import AuthForm from "@/components/auth-form";
import Link from "next/link";
import H1 from "@/components/h1";

export default function SignupPage() {
	return (
		<main className="flex flex-col justify-center items-center gap-y-4">
			<H1>Sign Up</H1>

			<AuthForm />

			<p>
				Already have an account?{" "}
				<Link
					href="/login"
					className="font-medium text-zinc-500 hover:text-zinc-600 transition"
				>
					Log In
				</Link>
				.
			</p>
		</main>
	);
}
