import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./server-utils";
import { authFormDataSchema } from "./zod-schemas";
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
				// Runs on login

				// Validation
				const parsedAuthData = authFormDataSchema.safeParse(credentials);
				if (!parsedAuthData.success) {
					return null;
				}

				// Extract values
				const { email, password } = parsedAuthData.data;

				const user = await getUserByEmail(email);

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
			const hasAccess = auth?.user.hasAccess;

			// If user is not logged in and trying to access app
			if (!isLoggedIn && isAccessingApp) {
				return false;
			}

			// If user is logged in and trying to access app and does not have access
			if (isLoggedIn && isAccessingApp && !hasAccess) {
				return Response.redirect(new URL("/payment", request.nextUrl));
			}

			// If user is logged in and trying to access app and bought lifetime access
			if (isLoggedIn && isAccessingApp && hasAccess) {
				return true;
			}

			// If user is logged in and not trying to access app
			if (isLoggedIn && !isAccessingApp) {
				if (
					(request.nextUrl.pathname.includes("/login") ||
						request.nextUrl.pathname.includes("/signup")) &&
					!hasAccess
				) {
					return Response.redirect(new URL("/payment", request.nextUrl));
				}

				return true;
			}

			// If user is not logged in and not trying to access app
			if (!isLoggedIn && !isAccessingApp) {
				return true;
			}
		},
		jwt: async ({ token, user, trigger }) => {
			if (user) {
				// On sign in
				token.userId = user.id;
				token.email = user.email!;
				token.hasAccess = user.hasAccess;
			}

			if (trigger === "update") {
				// on every request
				const user = await getUserByEmail(token.email);
				if (user) {
					token.hasAccess = user.hasAccess;
				}
			}

			return token;
		},
		session: ({ session, token }) => {
			if (session.user) {
				session.user.id = token.userId;
				session.user.hasAccess = token.hasAccess;
			}

			return session;
		},
	},
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(config);
