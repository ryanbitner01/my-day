import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RouterProvider, createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";

describe("RootLayout", () => {
	it("should render NavSection", () => {
		const router = createBrowserRouter([
			{
				path: "/",
				element: <RootLayout />,
				children: [{ index: true, element: <div>Test Page</div> }],
			},
		]);

		render(<RouterProvider router={router} />);

		// NavSection should be present (check for nav content)
		expect(screen.getByRole("list")).toBeInTheDocument();
	});

	it("should render Outlet content", () => {
		const router = createBrowserRouter([
			{
				path: "/",
				element: <RootLayout />,
				children: [{ index: true, element: <div>Dashboard Content</div> }],
			},
		]);

		render(<RouterProvider router={router} />);

		expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
	});
});
