import Image from "next/image";
import { Pet } from "@/lib/types";
import { PLACEHOLDER_IMG } from "@/lib/constants";

type PetListProps = {
	pets: Pet[];
};

export default function PetList({ pets }: PetListProps) {
	return (
		<ul className="bg-white border-b border-black/[0.08]">
			{pets.map((pet) => (
				<li key={pet.id}>
					<button className="flex items-center h-[70px] w-full px-5 gap-3 text-base cursor-pointer hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition">
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
