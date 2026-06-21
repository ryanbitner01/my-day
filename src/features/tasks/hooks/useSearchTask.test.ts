import { act, renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { taskService } from "../services";
import { useTasks } from "./useTasks";
import type { Task } from "@app-types/task.types";
import { useSearchTasks } from "./useSearchTask";

describe("useSearchTasks", () => {
	it("should return initial values of empty", () => {
		const { result } = renderHook(() => useSearchTasks([]));
		expect(result.current.filteredTasks).toEqual([]);
	});

	it("should return initial list if query is empty", () => {
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
		const { result } = renderHook(() => useSearchTasks(mockTasks));
		expect(result.current.filteredTasks).toEqual(mockTasks);
	});

	it("should filtered tasks be filtered to only include tasks that inlcude the query", async () => {
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

		const testQuery = "Create";

		const { result } = renderHook(() => useSearchTasks(mockTasks));

		act(() => {
			result.current.setSearchTerm(testQuery);
		});

		await waitFor(() => {
			expect(result.current.filteredTasks.length).toEqual(1);
		});

		expect(result.current.filteredTasks[0].id).toEqual("2");
	});
});
