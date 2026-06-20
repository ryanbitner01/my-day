import type { Task } from "@app-types/task.types";
import type { TaskService } from "./task.service";

export const mockTaskService: TaskService = {
	async getTasks(): Promise<Task[]> {
		let tasks: Task[] = [
			{
				description: "Fix Bug",
				priority: "Low",
				dueDate: new Date("06/24/2026"),
				status: "To Do",
				id: "1",
			},
			{
				description: "Intialize Auth Flow",
				priority: "High",
				dueDate: new Date("06/26/2026"),
				status: "In Progress",
				id: "2",
			},
		];
		return tasks;
	},
};
