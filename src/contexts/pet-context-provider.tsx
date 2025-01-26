"use client";

import { createContext, useOptimistic, useState } from "react";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet, PetFormData, PetId } from "@/lib/types";
import { handleActionError } from "@/lib/utils";

type PetContextProviderProps = {
	petsData: Pet[];
	children: React.ReactNode;
};

type PetContext = {
	pets: Pet[];
	selectedPet: Pet | undefined;
	selectedPetId: PetId | null;
	selectedPetIndex: number;
	numberOfPets: number;
	handleChangeSelectedPetID: (id: PetId) => void;
	handleCheckoutPet: (id: PetId) => Promise<void>;
	handleAddPet: (newPet: PetFormData) => Promise<void>;
	handleEditPet: (id: PetId, editedPet: PetFormData) => Promise<void>;
};

export const PetContext = createContext<PetContext | null>(null);

export default function PetContextProvider({
	petsData,
	children,
}: PetContextProviderProps) {
	// State
	const [optimisticPets, setOptimisticPets] = useOptimistic(
		petsData,
		(state, { action, payload }) => {
			switch (action) {
				case "add":
					return [...state, { ...payload, id: Math.random().toString() }];

				case "edit":
					return state.map((pet) => {
						if (pet.id === payload.id) {
							return { ...pet, ...payload.editedPet };
						}
						return pet;
					});

				case "delete":
					return state.filter((pet) => pet.id !== payload);

				default:
					return state;
			}
		}
	);
	const [selectedPetId, setSelectedPetId] = useState<PetId | null>(null);

	// Derived state
	const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
	const selectedPetIndex = optimisticPets.findIndex(
		(pet) => pet.id === selectedPetId
	);
	const numberOfPets = optimisticPets.length;

	// Event handlers / actions
	const handleChangeSelectedPetID = (id: PetId) => {
		setSelectedPetId(id);
	};

	const handleCheckoutPet = async (id: PetId) => {
		setOptimisticPets({ action: "delete", payload: id });

		const error = await deletePet(id);
		handleActionError(error);

		setSelectedPetId(null);
	};

	const handleAddPet = async (newPet: PetFormData) => {
		setOptimisticPets({ action: "add", payload: newPet });

		const error = await addPet(newPet);
		handleActionError(error);
	};

	const handleEditPet = async (id: PetId, editedPet: PetFormData) => {
		setOptimisticPets({ action: "edit", payload: { id, editedPet } });

		const error = await editPet(id, editedPet);
		handleActionError(error);
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
