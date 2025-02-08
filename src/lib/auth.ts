import NextAuth, { NextAuthConfig } from "next-auth";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
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
		authorized: ({ request, auth }) => {
			// runs on every request with middleware
			const isLoggedIn = Boolean(auth?.user);
			const isAccessingApp = request.nextUrl.pathname.includes("/app");

			// If user is not logged in and trying to access app
			if (!isLoggedIn && isAccessingApp) {
				return false;
			}
			// If user is logged in and trying to access app
			if (isLoggedIn && isAccessingApp) {
				return true;
			}
			// If user is logged in and not trying to access app
			if (isLoggedIn && !isAccessingApp) {
				return Response.redirect(new URL("/app/dashboard", request.nextUrl));
			}
			// If user is not logged in and not trying to access app
			if (!isLoggedIn && !isAccessingApp) {
				return true;
			}
		},
		jwt: ({ token, user }) => {
			if (user) {
				// On sign in
				token.userId = user.id;
			}

			return token;
		},
		session: ({ session, token }) => {
			if (session.user) {
				session.user.id = token.userId;
			}

			return session;
		},
	},
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
