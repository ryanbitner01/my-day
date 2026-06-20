import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RouterProvider, createBrowserRouter } from "react-router";
import { NavSection } from "./NavSection";

describe("NavSection", () => {
	it("should render navigation links", () => {
		const router = createBrowserRouter([
			{ path: "/", element: <NavSection /> },
			{ path: "/tasks", element: <div>Tasks</div> },
		]);

		render(<RouterProvider router={router} />);

		expect(screen.getByText("Dashboard")).toBeInTheDocument();
		expect(screen.getByText("Tasks")).toBeInTheDocument();
	});

	it("should mark dashboard link as active on home route", () => {
		const router = createBrowserRouter([
			{ path: "/", element: <NavSection /> },
			{ path: "/tasks", element: <div>Tasks</div> },
		]);

		render(<RouterProvider router={router} />);

		const dashboardLink = screen.getByText("Dashboard") as HTMLAnchorElement;
		expect(dashboardLink.className).toContain("underline");
	});

	it("should not mark tasks link as active on home route", () => {
		const router = createBrowserRouter([
			{ path: "/", element: <NavSection /> },
			{ path: "/tasks", element: <div>Tasks</div> },
		]);

		render(<RouterProvider router={router} />);

		const tasksLink = screen.getByText("Tasks") as HTMLAnchorElement;
		expect(tasksLink.className).not.toContain("underline");
	});
});
