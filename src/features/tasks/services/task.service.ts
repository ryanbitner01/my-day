import type { Task } from "@app-types/task.types";

export interface TaskService {
	getTasks(): Promise<Task[]>;
	saveTask(task: Task): Promise<Task>;
	getTask(id: string): Promise<Task>;
}
