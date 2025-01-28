import Logo from "@/components/logo";

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="flex flex-col justify-center items-center gap-y-4 min-h-screen">
			<Logo />
			{children}
		</div>
	);
}
