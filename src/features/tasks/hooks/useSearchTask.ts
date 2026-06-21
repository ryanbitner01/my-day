import type { Task } from "@app-types/task.types";
import { useMemo, useState } from "react";

export function useSearchTasks(tasks: Task[]) {
	const [getSearchTerm, setSearchTerm] = useState("");

	const filteredTasks = useMemo(() => {
		console.log(getSearchTerm);
		if (!getSearchTerm.trim()) return tasks;

		return tasks.filter((task) =>
			task.description.toLowerCase().includes(getSearchTerm.toLowerCase()),
		);
	}, [tasks, getSearchTerm]);

	return {
		setSearchTerm,
		filteredTasks,
	};
}
