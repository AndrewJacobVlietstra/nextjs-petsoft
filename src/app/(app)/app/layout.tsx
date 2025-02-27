import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import { Toaster } from "@/components/ui/sonner";
import { checkAuth, getPetsByUserId } from "@/lib/server-utils";

type LayoutProps = {
	children: React.ReactNode;
};
export default async function Layout({ children }: LayoutProps) {
	const session = await checkAuth();
	const petsData = await getPetsByUserId(session.user.id);

	return (
		<>
			<BackgroundPattern />

			<div className="flex flex-col max-w-[1050px] mx-auto min-h-screen px-4">
				<AppHeader />

				<SearchContextProvider>
					<PetContextProvider petsData={petsData}>
						{children}
					</PetContextProvider>
				</SearchContextProvider>

				<AppFooter />
			</div>

			<Toaster position="top-right" />
		</>
	);
}
