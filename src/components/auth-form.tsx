"use client";

import { usePathname } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AuthForm() {
	const activePath = usePathname();

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

			<Button>{activePath === "/login" ? "Log In" : "Sign Up"}</Button>
		</form>
	);
}
