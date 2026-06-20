import type { Task } from "@app-types/task.types";

export interface TaskService {
	getTasks(): Promise<Task[]>;
}
