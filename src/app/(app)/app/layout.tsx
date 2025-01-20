import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import { BASE_API_URL } from "@/lib/constants";
import { Pet } from "@/lib/types";

type LayoutProps = {
	children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
	const response = await fetch(BASE_API_URL);
	if (!response.ok) {
		throw new Error("Could not fetch pets data");
	}
	const petsData: Pet[] = await response.json();

	return (
		<>
			<BackgroundPattern />

			<div className="flex flex-col max-w-[1050px] mx-auto min-h-screen px-4">
				<AppHeader />
				<PetContextProvider petsData={petsData}>{children}</PetContextProvider>
				<AppFooter />
			</div>
		</>
	);
}
