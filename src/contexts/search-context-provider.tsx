"use client";

import { createContext, useState } from "react";

type SearchContextProviderProps = {
	children: React.ReactNode;
};

type SearchContext = {
	searchText: string;
	handleChangeSearchText: (newSearch: string) => void;
};

export const SearchContext = createContext<SearchContext | null>(null);

export default function SearchContextProvider({
	children,
}: SearchContextProviderProps) {
	// State
	const [searchText, setSearchText] = useState("");

	// Derived state

	// Event handlers / actions
	const handleChangeSearchText = (newSearch: string) => {
		setSearchText(newSearch);
	};

	return (
		<SearchContext.Provider
			value={{
				searchText,
				handleChangeSearchText,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
}
