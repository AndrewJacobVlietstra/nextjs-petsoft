"use client";

import { HEADER_ROUTES } from "@/lib/constants";
import Logo from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AppHeader() {
	const activePathname = usePathname();

	return (
		<header className="flex justify-between items-center border-b border-white/10 py-2">
			<Logo />

			<nav>
				<ul className="flex gap-2 text-sm">
					{HEADER_ROUTES.map((route) => (
						<li key={route.path}>
							<Link
								href={route.path}
								className={cn(
									"text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition",
									{
										// conditional styles
										"bg-black/10 text-white": route.path === activePathname,
									}
								)}
							>
								{route.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
