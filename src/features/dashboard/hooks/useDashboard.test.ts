import { renderHook, waitFor } from "@testing-library/react";
import { useDashboard } from "./useDashboard";
import { dashboardService } from "../services";
import { vi } from "vitest";

vi.mock("../services", () => ({
	dashboardService: { getDashboard: vi.fn() },
}));

describe("useDashboard", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(
			dashboardService.getDashboard as ReturnType<typeof vi.fn>
		).mockResolvedValue({
			totalTasks: 0,
			completedTasks: 0,
			recentTasks: [],
		});
	});

	it("should return initial values of null and isloading when initialized", () => {
		const { result } = renderHook(() => useDashboard());
		expect(result.current.dashboard).toBe(null);
		expect(result.current.isLoading).toBe(true);
	});

	it("should fetch dashboard after useEffect is called", async () => {
		const mockDashboard = {
			totalTasks: 28,
			completedTasks: 18,
		};

		(
			dashboardService.getDashboard as ReturnType<typeof vi.fn>
		).mockResolvedValue(mockDashboard);

		const { result } = renderHook(() => useDashboard());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});
		expect(result.current.dashboard).toEqual(mockDashboard);
		expect(dashboardService.getDashboard).toHaveBeenCalled();
	});
});
