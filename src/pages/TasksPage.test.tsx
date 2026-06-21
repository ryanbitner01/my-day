import type { Task } from "@app-types/task.types";
import { vi } from "vitest";
import { taskService } from "../features/tasks/services";
import { TasksPage } from "./TasksPage";
import { render } from "@testing-library/react";

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

vi.mock("../features/tasks/services", () => ({
	taskService: { getTasks: vi.fn() },
}));

describe("TasksPage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render header, searchbar, and table", () => {
		(taskService.getTasks as any).mockResolvedValue(mockTasks);

		render(<TasksPage></TasksPage>);
	});
});
