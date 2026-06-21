import { SearchBar } from "../components/SearchBar";
import { TaskTable } from "../features/tasks/components/TaskTable";
import { useTasks } from "../features/tasks/hooks/useTasks";
import { useSearchTasks } from "../features/tasks/hooks/useSearchTask";
import { useNavigate } from "react-router";

export function TasksPage() {
	const navigate = useNavigate();
	const tasks = useTasks();
	const { setSearchTerm, filteredTasks } = useSearchTasks(tasks);

	const handleSearch = (query: string) => {
		setSearchTerm(query);
	};

	const handleCreateClick = () => {
		navigate("/tasks/new");
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="px-4 flex flex-col gap-2">
				<header className="text-cyan-600 text-5xl">Tasks</header>
				<SearchBar handleSearch={handleSearch}></SearchBar>
				<div className="pt-4">
					<button
						className="cursor-pointer text-1xl text-gray-50 bg-cyan-600 shadow-sm grow-0 float-right px-2 py-1 rounded"
						type="button"
						onClick={handleCreateClick}>
						Create New
					</button>
				</div>
			</div>

			<TaskTable tasks={filteredTasks}></TaskTable>
		</div>
	);
}
