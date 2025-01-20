"use client";

import Image from "next/image";
import { PLACEHOLDER_IMG } from "@/lib/constants";
import { usePetContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function PetList() {
	const { pets, selectedPetId, handleChangeSelectedPetID } = usePetContext();

	return (
		<ul className="bg-white border-b border-black/[0.08]">
			{pets.map((pet) => (
				<li key={pet.id}>
					<button
						className={cn(
							"flex items-center h-[70px] w-full px-5 gap-3 text-base cursor-pointer hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
							{
								"bg-[#EFF1F2]": pet.id === selectedPetId,
							}
						)}
						onClick={() => handleChangeSelectedPetID(pet.id)}
					>
						<Image
							className="w-[45px] h-[45px] rounded-full object-cover"
							src={pet.imageUrl || PLACEHOLDER_IMG}
							alt="Pet image"
							width={45}
							height={45}
						/>
						<p className="font-semibold">{pet.name}</p>
					</button>
				</li>
			))}
		</ul>
	);
}
