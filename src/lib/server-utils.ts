import "server-only";
import { auth } from "@/lib/auth";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { PetId } from "./types";
import { User } from "@prisma/client";

export async function checkAuth() {
	const session = await auth();

	if (!session?.user) {
		return redirect("/login");
	}

	return session;
}

export async function getUserByEmail(email: User["email"]) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	return user;
}

export async function getPetById(petId: PetId) {
	const pet = await prisma.pet.findUnique({
		where: {
			id: petId,
		},
	});

	return pet;
}

export async function getPetsByUserId(userId: User["id"]) {
	const pets = await prisma.pet.findMany({
		where: {
			userId,
		},
	});

	return pets;
}
