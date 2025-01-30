import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AuthFormTypes } from "@/lib/types";

type AuthFormProps = {
	type: AuthFormTypes;
};

export default function AuthForm({ type }: AuthFormProps) {
	return (
		<form className="flex flex-col gap-y-5">
			<div>
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" />
			</div>

			<div>
				<Label htmlFor="password">Password</Label>
				<Input type="password" id="password" />
			</div>

			<Button>{type === "login" ? "Log In" : "Sign Up"}</Button>
		</form>
	);
}
