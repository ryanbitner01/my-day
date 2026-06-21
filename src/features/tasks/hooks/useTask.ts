import type { Task } from "@app-types/task.types";
import { useEffect, useState } from "react";
import { taskService } from "../services";

export function useTask(id: string) {
	const [task, setTask] = useState<Task | null>(null);

	useEffect(() => {
		taskService.getTask(id).then(setTask);
	});

	return task;
}
