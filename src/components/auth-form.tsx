import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { AuthFormTypes } from "@/lib/types";
import { login, signup } from "@/actions/actions";
import AuthFormBtn from "./auth-form-btn";

type AuthFormProps = {
	type: AuthFormTypes;
};

export default function AuthForm({ type }: AuthFormProps) {
	return (
		<form
			action={type === "login" ? login : signup}
			className="flex flex-col gap-y-6"
		>
			<div>
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" name="email" required />
			</div>

			<div>
				<Label htmlFor="password">Password</Label>
				<Input type="password" id="password" name="password" required />
			</div>

			<AuthFormBtn type={type} />
		</form>
	);
}
