import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AuthFormTypes } from "@/lib/types";
import { login } from "@/actions/actions";

type AuthFormProps = {
	type: AuthFormTypes;
};

export default function AuthForm({ type }: AuthFormProps) {
	return (
		<form action={login} className="flex flex-col gap-y-6">
			<div>
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" name="email" />
			</div>

			<div>
				<Label htmlFor="password">Password</Label>
				<Input type="password" id="password" name="password" />
			</div>

			<Button>{type === "login" ? "Log In" : "Sign Up"}</Button>
		</form>
	);
}
