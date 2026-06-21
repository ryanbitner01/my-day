import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { TaskDetailsPage } from "./TaskDetailsPage";
import type { Task } from "@app-types/task.types";
import { taskService } from "../features/tasks/services";
import { useLoaderData } from "react-router";
const newMockTask: Task = {
	id: "1",
	dueDate: new Date(),
	priority: "High",
	status: "To Do",
	description: "Test bugs",
};

const navigateMock = vi.fn();

vi.mock("../features/tasks/services", () => ({
	taskService: {
		saveTask: vi.fn(),
	},
}));

vi.mock("react-router", async () => {
	const actual =
		await vi.importActual<typeof import("react-router")>("react-router");
	return {
		...actual,
		useNavigate: () => navigateMock,
		useLoaderData: vi.fn(),
	};
});

const loaderDataMock = vi.mocked(useLoaderData);

describe("TaskDetailsPage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		loaderDataMock.mockReturnValue(null);
		(taskService.saveTask as ReturnType<typeof vi.fn>).mockResolvedValue(
			newMockTask,
		);
	});

	it("should render all fields with default values when no task is given", () => {
		render(<TaskDetailsPage></TaskDetailsPage>);
		const descriptionInput = screen.getByLabelText("Description");
		expect(descriptionInput).toBeInTheDocument();

		const dueDateInput = screen.getByLabelText("Due Date");
		expect(dueDateInput).toHaveAttribute("type", "date");

		const lowPriorityRadio = screen.getByRole("radio", { name: /low/i });
		expect(lowPriorityRadio).toBeInTheDocument();
		expect(lowPriorityRadio).toBeChecked();

		const statusRadio = screen.getByRole("radio", { name: /to do/i });
		expect(statusRadio).toBeInTheDocument();
		expect(statusRadio).toBeChecked();

		const saveChangesButton = screen.getByRole("button");
		expect(saveChangesButton).toBeDisabled();
	});

	it("should all fields be filled out button will be enabled", () => {
		render(<TaskDetailsPage></TaskDetailsPage>);
		const descriptionInput = screen.getByLabelText("Description");
		fireEvent.change(descriptionInput, {
			target: { value: "Create navigation" },
		});

		const dueDateInput = screen.getByLabelText("Due Date");
		fireEvent.change(dueDateInput, { target: { value: "2026-06-26" } });
		const lowPriorityRadio = screen.getByRole("radio", { name: /low/i });
		fireEvent.click(lowPriorityRadio);

		const statusRadio = screen.getByRole("radio", { name: /to do/i });
		fireEvent.click(statusRadio);

		const saveChangesButton = screen.getByRole("button");
		expect(saveChangesButton).toBeEnabled();
	});

	it("should saveTask be called if form is submit button is pressed", async () => {
		render(<TaskDetailsPage></TaskDetailsPage>);

		fireEvent.change(screen.getByLabelText("Description"), {
			target: { value: "Create navigation" },
		});
		fireEvent.change(screen.getByLabelText("Due Date"), {
			target: { value: "2026-06-26" },
		});
		fireEvent.click(screen.getByRole("radio", { name: /low/i }));
		fireEvent.click(screen.getByRole("radio", { name: /to do/i }));

		fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

		await waitFor(() => {
			expect(taskService.saveTask).toHaveBeenCalled();
			expect(navigateMock).toHaveBeenCalledWith("/tasks");
		});
	});

	it("should populate form fields when task is loaded", () => {
		loaderDataMock.mockReturnValue(newMockTask);
		render(<TaskDetailsPage />);

		expect(screen.getByLabelText("Description")).toHaveValue(
			newMockTask.description,
		);
		expect(screen.getByRole("radio", { name: /high/i })).toBeChecked();
		expect(screen.getByRole("radio", { name: /to do/i })).toBeChecked();
	});

	it("should save with form values, not hardcoded values", async () => {
		render(<TaskDetailsPage />);

		fireEvent.change(screen.getByLabelText("Description"), {
			target: { value: "My task" },
		});
		fireEvent.change(screen.getByLabelText("Due Date"), {
			target: { value: "2026-07-01" },
		});
		fireEvent.click(screen.getByRole("radio", { name: /high/i }));
		fireEvent.click(screen.getByRole("radio", { name: /in progress/i }));

		fireEvent.click(screen.getByRole("button", { name: /save/i }));

		await waitFor(() => {
			expect(taskService.saveTask).toHaveBeenCalledWith(
				expect.objectContaining({
					description: "My task",
					priority: "High",
					status: "In Progress",
				}),
			);
		});
	});

	it("should use existing task ID when editing", async () => {
		loaderDataMock.mockReturnValue(newMockTask);
		render(<TaskDetailsPage />);

		fireEvent.click(screen.getByRole("button", { name: /save/i }));

		await waitFor(() => {
			expect(taskService.saveTask).toHaveBeenCalledWith(
				expect.objectContaining({ id: newMockTask.id }),
			);
		});
	});

	it("should change priority radio value when clicked", () => {
		render(<TaskDetailsPage />);

		fireEvent.click(screen.getByRole("radio", { name: /medium/i }));
		expect(screen.getByRole("radio", { name: /medium/i })).toBeChecked();

		fireEvent.click(screen.getByRole("radio", { name: /high/i }));
		expect(screen.getByRole("radio", { name: /high/i })).toBeChecked();

		fireEvent.click(screen.getByRole("radio", { name: /low/i }));
		expect(screen.getByRole("radio", { name: /low/i })).toBeChecked();
	});

	it("should change status radio value when clicked", () => {
		render(<TaskDetailsPage />);

		fireEvent.click(screen.getByRole("radio", { name: /in progress/i }));
		expect(screen.getByRole("radio", { name: /in progress/i })).toBeChecked();

		fireEvent.click(screen.getByRole("radio", { name: /done/i }));
		expect(screen.getByRole("radio", { name: /done/i })).toBeChecked();

		fireEvent.click(screen.getByRole("radio", { name: /to do/i }));
		expect(screen.getByRole("radio", { name: /to do/i })).toBeChecked();
	});
});
