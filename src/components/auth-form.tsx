"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { AuthFormTypes } from "@/lib/types";
import { login, signup } from "@/actions/actions";
import { useFormState } from "react-dom";
import AuthFormBtn from "./auth-form-btn";

type AuthFormProps = {
	type: AuthFormTypes;
};

export default function AuthForm({ type }: AuthFormProps) {
	const [signupError, dispatchSignup] = useFormState(signup, undefined);
	const [loginError, dispatchLogin] = useFormState(login, undefined);

	return (
		<form
			action={type === "login" ? dispatchLogin : dispatchSignup}
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

			{signupError && (
				<p className=" text-red-500 text-sm text-center mt-2">
					{signupError.message}
				</p>
			)}

			{loginError && (
				<p className=" text-red-500 text-sm text-center mt-2">
					{loginError.message}
				</p>
			)}
		</form>
	);
}
