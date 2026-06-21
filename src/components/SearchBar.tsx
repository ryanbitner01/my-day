import { useState } from "react";

interface SearchBarProps {
	handleSearch(query: string): void;
}

export function SearchBar({ handleSearch }: SearchBarProps) {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className="flex gap-4 items-center">
			<p>Search</p>
			<input
				value={searchTerm}
				onChange={(event) => {
					const value = event.target.value;
					setSearchTerm(value);
					handleSearch(value); // run search on every change
				}}
				className="bg-gray-100 shadow-sm p-2 grow-1"
				type="search"></input>
		</div>
	);
}
