import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

const config = {
	pages: {
		signIn: "/login",
	},
	session: {
		maxAge: 86400, // 86400 seconds == 1 day,
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				// runs on login
				const { email, password } = credentials;

				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				});

				if (!user) {
					console.log("No user found!");
					return null;
				}

				const passwordsMatch = await bcrypt.compare(
					password,
					user.hashedPassword
				);

				if (!passwordsMatch) {
					console.log("Invalid credentials.");
					return null;
				}

				return user;
			},
		}),
	],
	callbacks: {
		authorized: ({ request }) => {
			// runs on every request with middleware
			const isAccessingApp = request.nextUrl.pathname.includes("/app");

			if (isAccessingApp) {
				return false;
			} else {
				return true;
			}
		},
	},
} satisfies NextAuthConfig;

export const { auth, signIn } = NextAuth(config);
