import type { Task } from "@app-types/task.types";
import type { TaskService } from "./task.service";

let tasks: Task[] = [
	{
		description: "Fix Bug",
		priority: "Low",
		dueDate: new Date("06/24/2026"),
		status: "To Do",
		id: "1",
	},
	{
		description: "Initialize Auth Flow",
		priority: "High",
		dueDate: new Date("06/26/2026"),
		status: "In Progress",
		id: "2",
	},
];

export const mockTaskService: TaskService = {
	async getTasks(): Promise<Task[]> {
		return tasks.map((task) => ({ ...task }));
	},

	async saveTask(task: Task): Promise<Task> {
		console.log("TASK", task, "TASKS", tasks);
		const existingIndex = tasks.findIndex(
			(existing) => existing.id === task.id,
		);
		if (existingIndex >= 0) {
			tasks = tasks.map((existing) =>
				existing.id === task.id ? { ...task } : existing,
			);
		} else {
			tasks = [...tasks, { ...task }];
		}
		return { ...task };
	},

	async getTask(id: string): Promise<Task> {
		let task = tasks.find((task) => task.id === id);
		if (!task) throw "Task not found";
		return task;
	},
};
