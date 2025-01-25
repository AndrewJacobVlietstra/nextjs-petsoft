"use client";

import { createContext, useOptimistic, useState } from "react";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet, PetFormData } from "@/lib/types";
import { toast } from "sonner";

type PetContextProviderProps = {
	petsData: Pet[];
	children: React.ReactNode;
};

type PetContext = {
	pets: Pet[];
	selectedPet: Pet | undefined;
	selectedPetId: string | null;
	selectedPetIndex: number;
	numberOfPets: number;
	handleChangeSelectedPetID: (id: string) => void;
	handleCheckoutPet: (id: string) => Promise<void>;
	handleAddPet: (newPet: PetFormData) => Promise<void>;
	handleEditPet: (id: string, editedPet: PetFormData) => Promise<void>;
};

export const PetContext = createContext<PetContext | null>(null);

export default function PetContextProvider({
	petsData,
	children,
}: PetContextProviderProps) {
	// State
	const [optimisticPets, setOptimisticPets] = useOptimistic(
		petsData,
		(state, newPetData: PetFormData) => {
			return [...state, { ...newPetData, id: Math.random().toString() }];
		}
	);
	const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

	// Derived state
	const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
	const selectedPetIndex = optimisticPets.findIndex(
		(pet) => pet.id === selectedPetId
	);
	const numberOfPets = optimisticPets.length;

	// Event handlers / actions
	const handleChangeSelectedPetID = (id: string) => {
		setSelectedPetId(id);
	};

	const handleCheckoutPet = async (id: string) => {
		await deletePet(id);

		setSelectedPetId(null);
	};

	const handleAddPet = async (newPet: PetFormData) => {
		setOptimisticPets(newPet);

		const error = await addPet(newPet);
		if (error) {
			toast.warning(error.message);
			return;
		}
	};

	const handleEditPet = async (id: string, editedPet: PetFormData) => {
		const error = await editPet(id, editedPet);
		if (error) {
			toast.warning(error.message);
			return;
		}
	};

	return (
		<PetContext.Provider
			value={{
				pets: optimisticPets,
				selectedPet,
				selectedPetId,
				selectedPetIndex,
				numberOfPets,
				handleChangeSelectedPetID,
				handleCheckoutPet,
				handleAddPet,
				handleEditPet,
			}}
		>
			{children}
		</PetContext.Provider>
	);
}
