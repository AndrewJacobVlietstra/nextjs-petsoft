"use client";

import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps = {
	petsData: Pet[];
	children: React.ReactNode;
};

type PetContext = {
	pets: Pet[];
	selectedPet: Pet | undefined;
	selectedPetId: string | null;
	numberOfPets: number;
	handleChangeSelectedPetID: (id: string) => void;
	handleCheckoutPet: (id: string) => void;
	handleAddPet: (newPet: Pet) => void;
};

export const PetContext = createContext<PetContext | null>(null);

export default function PetContextProvider({
	petsData,
	children,
}: PetContextProviderProps) {
	// State
	const [pets, setPets] = useState(petsData);
	const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

	// Derived state
	const selectedPet = pets.find((pet) => pet.id === selectedPetId);
	const numberOfPets = pets.length;

	// Event handlers / actions
	const handleChangeSelectedPetID = (id: string) => {
		setSelectedPetId(id);
	};

	const handleCheckoutPet = (id: string) => {
		setPets((prev) => prev.filter((pet) => pet.id !== id));
		setSelectedPetId(null);
	};

	const handleAddPet = (newPet: Pet) => {
		setPets((prev) => [...prev, newPet]);
	};

	return (
		<PetContext.Provider
			value={{
				pets,
				selectedPet,
				selectedPetId,
				numberOfPets,
				handleChangeSelectedPetID,
				handleCheckoutPet,
				handleAddPet,
			}}
		>
			{children}
		</PetContext.Provider>
	);
}
