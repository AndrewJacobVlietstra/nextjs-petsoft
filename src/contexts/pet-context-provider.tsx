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
	handleChangeSelectedPetID: (id: string) => void;
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

	// Event handlers / actions
	const handleChangeSelectedPetID = (id: string) => {
		setSelectedPetId(id);
	};

	return (
		<PetContext.Provider
			value={{ pets, selectedPet, selectedPetId, handleChangeSelectedPetID }}
		>
			{children}
		</PetContext.Provider>
	);
}
