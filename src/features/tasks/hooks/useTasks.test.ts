import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { taskService } from "../services";
import { useTasks } from "./useTasks";
import type { Task } from "@app-types/task.types";

vi.mock("../services", () => ({
	taskService: { getTasks: vi.fn() },
}));

describe("useTasks", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(taskService.getTasks as ReturnType<typeof vi.fn>).mockResolvedValue([]);
	});

	it("should return initial values of empty", () => {
		const { result } = renderHook(() => useTasks());
		expect(result.current).toEqual([]);
	});

	it("should fetch dashboard after useEffect is called", async () => {
		const mockTasks: Task[] = [
			{
				description: "Add tests",
				priority: "Medium",
				dueDate: new Date(),
				status: "To Do",
				id: "1",
			},
			{
				description: "Create new component",
				priority: "High",
				dueDate: new Date(),
				status: "In Progress",
				id: "2",
			},
		];

		(taskService.getTasks as ReturnType<typeof vi.fn>).mockResolvedValue(
			mockTasks,
		);

		const { result } = renderHook(() => useTasks());

		await waitFor(() => {
			expect(result.current).toEqual(mockTasks);
		});

		expect(taskService.getTasks).toHaveBeenCalled();
	});
});
