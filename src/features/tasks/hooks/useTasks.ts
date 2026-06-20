import type { Task } from "@app-types/task.types";
import { useEffect, useState } from "react";
import { taskService } from "../services";

export function useTasks() {
	const [getTasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		taskService.getTasks().then((tasks) => setTasks(tasks));
	}, []);

	return getTasks;
}
