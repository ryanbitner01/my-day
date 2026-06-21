import { SearchBar } from "../components/SearchBar";
import { TaskTable } from "../features/tasks/components/TaskTable";
import { useTasks } from "../features/tasks/hooks/useTasks";
import { useSearchTasks } from "../features/tasks/hooks/useSearchTask";

export function TasksPage() {
	const tasks = useTasks();
	const { setSearchTerm, filteredTasks } = useSearchTasks(tasks);

	const handleSearch = (query: string) => {
		setSearchTerm(query);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="px-4 flex flex-col gap-2">
				<header className="text-cyan-600 text-5xl">Tasks</header>
				<SearchBar handleSearch={handleSearch}></SearchBar>
			</div>

			<TaskTable tasks={filteredTasks}></TaskTable>
		</div>
	);
}
