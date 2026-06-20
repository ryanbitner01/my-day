export interface Task {
	description: string;
	priority: TaskPriority;
	dueDate: Date;
	status: TaskStatus;
	id: string;
}

export type TaskPriority = "Low" | "Medium" | "High";

export type TaskStatus = "To Do" | "In Progress" | "Done";
