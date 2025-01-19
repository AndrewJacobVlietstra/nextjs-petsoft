import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<BackgroundPattern />

			<div className="flex flex-col max-w-[1050px] mx-auto min-h-screen px-4">
				<AppHeader />
				{children}
				<AppFooter />
			</div>
		</>
	);
}
