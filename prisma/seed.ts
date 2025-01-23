import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pets = [
	{
		name: "Benjamin",
		ownerName: "John Doe",
		imageUrl:
			"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=100&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		age: 2,
		notes:
			"Doesn't like to be touched on the belly. Plays well with other dogs.",
	},
	{
		name: "Richard",
		ownerName: "Josephine Dane",
		imageUrl:
			"https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=100&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		age: 5,
		notes: "Needs medication twice a day.",
	},
	{
		name: "Anna",
		ownerName: "Frank Doe",
		imageUrl:
			"https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=100&w=1970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		age: 4,
		notes: "Allergic to chicken.",
	},
	{
		name: "Penny",
		ownerName: "Andrew V",
		imageUrl:
			"https://images.unsplash.com/photo-1623010830364-860f2c821d5d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		age: 8,
		notes: "Barks a lot. Loves to chase her ball.",
	},
	{
		name: "Max",
		ownerName: "Derek Hanes",
		imageUrl:
			"https://images.unsplash.com/photo-1649923625793-af1cbd33c8bd?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		age: 5,
		notes: "Needs to go on at least one walk every day.",
	},
];

async function main() {
	console.log(`Start seeding ...`);

	for (const pet of pets) {
		const result = await prisma.pet.create({
			data: pet,
		});
		console.log(`Created pet with id: ${result.id}`);
	}

	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
