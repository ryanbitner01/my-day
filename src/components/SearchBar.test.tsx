import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
	it("should be empty on initialization", () => {
		const handleSearch = vi.fn();
		render(<SearchBar handleSearch={handleSearch} />);

		const input = screen.getByRole("searchbox") as HTMLInputElement;
		expect(input.value).toBe("");
		expect(handleSearch).not.toHaveBeenCalled();
	});

	it("should call handleSearch when the input changes", () => {
		const handleSearch = vi.fn();
		render(<SearchBar handleSearch={handleSearch} />);

		const input = screen.getByRole("searchbox") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "Create" } });

		expect(input.value).toBe("Create");
		expect(handleSearch).toHaveBeenCalledTimes(1);
		expect(handleSearch).toHaveBeenCalledWith("Create");
	});
});
