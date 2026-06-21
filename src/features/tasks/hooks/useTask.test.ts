import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useTask } from "./useTask";
import { taskService } from "../services";
import type { Task } from "@app-types/task.types";

vi.mock("../services", () => ({
	taskService: { getTask: vi.fn().mockResolvedValue(null) },
}));

describe("useTask", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should be null on init", () => {
		const { result } = renderHook(() => useTask(""));
		expect(result.current).toBeNull();
	});

	it("should call getTask", () => {
		renderHook(() => useTask("1"));
		expect(taskService.getTask).toHaveBeenCalledWith("1");
	});

	it("should return expected task", () => {
		const { result } = renderHook(() => useTask("1"));
		const expectedTask: Task = {
			description: "",
			priority: "Low",
			dueDate: new Date(),
			status: "To Do",
			id: "",
		};

		(taskService.getTask as ReturnType<typeof vi.fn>).mockResolvedValue(
			expectedTask,
		);

		waitFor(() => {
			expect(result.current).toEqual(expectedTask);
		});
	});
});
