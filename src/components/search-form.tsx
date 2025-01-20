"use client";

import { useSearchContext } from "@/lib/hooks";

export default function SearchForm() {
	const { searchText, handleChangeSearchText } = useSearchContext();

	return (
		<form className="w-full h-full">
			<input
				value={searchText}
				onChange={(e) => handleChangeSearchText(e.target.value)}
				className="w-full h-full rounded-md px-5 outline-none bg-white/20 hover:bg-white/30 focus:bg-white/50 placeholder:text-black/70 transition"
				placeholder="Search pets..."
				type="search"
			/>
		</form>
	);
}
