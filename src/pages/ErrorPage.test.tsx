import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ErrorPage } from "./ErrorPage";
import { useRouteError, isRouteErrorResponse } from "react-router";

vi.mock("react-router", async () => {
	const actual =
		await vi.importActual<typeof import("react-router")>("react-router");
	return {
		...actual,
		useRouteError: vi.fn(),
		isRouteErrorResponse: vi.fn(),
	};
});

const useRouteErrorMock = vi.mocked(useRouteError);
const isRouteErrorResponseMock = vi.mocked(isRouteErrorResponse);

describe("ErrorPage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders a Response error message for 404", () => {
		isRouteErrorResponseMock.mockReturnValue(true);
		useRouteErrorMock.mockReturnValue(
			new Response("Task not found", {
				status: 404,
				statusText: "Not Found",
			}),
		);

		render(<ErrorPage />);

		expect(
			screen.getByRole("heading", { name: /404 not found/i }),
		).toBeInTheDocument();
		expect(screen.getByText(/not found/i)).toBeInTheDocument();
	});

	it("renders Response error data.message when data is an object", () => {
		isRouteErrorResponseMock.mockReturnValue(true);
		useRouteErrorMock.mockReturnValue({
			status: 500,
			statusText: "Server Error",
			data: { message: "Oops, load failed" },
		});

		render(<ErrorPage />);

		expect(
			screen.getByRole("heading", { name: /500 server error/i }),
		).toBeInTheDocument();
		expect(screen.getByText(/Oops, load failed/i)).toBeInTheDocument();
	});

	it("renders a generic Error message for normal Error objects", () => {
		isRouteErrorResponseMock.mockReturnValue(false);
		useRouteErrorMock.mockReturnValue(new Error("Network failure"));

		render(<ErrorPage />);

		expect(
			screen.getByRole("heading", { name: /something went wrong/i }),
		).toBeInTheDocument();
		expect(screen.getByText(/Network failure/i)).toBeInTheDocument();
	});

	it("renders fallback text for unknown error shapes", () => {
		isRouteErrorResponseMock.mockReturnValue(false);
		useRouteErrorMock.mockReturnValue("unknown error");

		render(<ErrorPage />);

		expect(
			screen.getByText(/An unexpected error occurred/i),
		).toBeInTheDocument();
	});
});
