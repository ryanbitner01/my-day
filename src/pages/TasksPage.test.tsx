import type { Task } from "@app-types/task.types";
import { vi } from "vitest";
import { taskService } from "../features/tasks/services";
import { TasksPage } from "./TasksPage";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";

import { useSearchTasks } from "../features/tasks/hooks/useSearchTask";

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

vi.mock("../features/tasks/hooks/useSearchTask", () => ({
	useSearchTasks: vi.fn(),
}));

const navigateMock = vi.fn();

vi.mock("react-router", async () => {
	const actual =
		await vi.importActual<typeof import("react-router")>("react-router");
	return {
		...actual,
		useNavigate: () => navigateMock,
	};
});

describe("TasksPage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(useSearchTasks as any).mockReturnValue({
			setSearchTerm: vi.fn(),
			filteredTasks: mockTasks,
		});
	});

	it("should render header, searchbar, and table", async () => {
		(taskService.getTasks as any).mockResolvedValue(mockTasks);

		render(<TasksPage></TasksPage>);

		await waitFor(() => {
			expect(screen.getByText("Create new component")).toBeInTheDocument();
		});
		expect(screen.getByText("Tasks")).toBeInTheDocument();
		expect(screen.getByRole("searchbox")).toBeInTheDocument();
	});

	it("should call setSearchTerm when search input changes", async () => {
		const setSearchTermMock = vi.fn();

		(useSearchTasks as any).mockReturnValue({
			setSearchTerm: setSearchTermMock,
			filteredTasks: mockTasks,
		});

		(taskService.getTasks as any).mockResolvedValue(mockTasks);

		render(<TasksPage />);

		const input = screen.getByRole("searchbox") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "Create" } });

		expect(setSearchTermMock).toHaveBeenCalledWith("Create");
	});

	it("should call navigate when create new clicked", () => {
		render(<TasksPage />);

		const button = screen.getByRole("button") as HTMLButtonElement;
		button.click();
		expect(navigateMock).toHaveBeenCalledWith("/tasks/new");
	});
});
