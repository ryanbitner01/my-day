import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { DashboardPage } from "./DashboardPage";
import { dashboardService } from "../features/dashboard/services";

vi.mock("../features/dashboard/services", () => ({
	dashboardService: { getDashboard: vi.fn() },
}));

describe("DashboardPage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render dashboard and recent tasks together", async () => {
		const mockDashboard = {
			totalTasks: 28,
			completedTasks: 18,
			recentTasks: ["Fix Bug", "Implement Auth"],
		};

		(dashboardService.getDashboard as any).mockResolvedValue(mockDashboard);

		render(<DashboardPage />);

		// Wait for data to load
		await waitFor(() => {
			expect(screen.getByText("28")).toBeInTheDocument();
		});

		// Verify both components rendered with correct data
		expect(screen.getByText("Dashboard")).toBeInTheDocument();
		expect(screen.getByText("Total Tasks")).toBeInTheDocument();
		expect(screen.getByText("Recently Completed")).toBeInTheDocument();
		expect(screen.getByText("Fix Bug")).toBeInTheDocument();
	});
});
