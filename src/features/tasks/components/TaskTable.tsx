import type { Task } from "@app-types/task.types";
import { useNavigate } from "react-router";

interface TaskTableProps {
	tasks: Task[];
}

export function TaskTable({ tasks }: TaskTableProps) {
	const navigate = useNavigate();

	const handleRowClick = (id: string) => {
		navigate(`/tasks/${id}`);
	};

	return (
		<table className="min-w-full divide-y divide-slate-200 border border-slate-200 bg-white shadow-sm">
			<thead className="bg-slate-50">
				<tr>
					<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
						Task
					</th>
					<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
						Priority
					</th>
					<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
						Due Date
					</th>
					<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
						Status
					</th>
				</tr>
			</thead>

			<tbody className="divide-y divide-slate-200">
				{tasks.map((task) => (
					<tr
						onClick={() => handleRowClick(task.id)}
						key={task.id}
						className="hover:bg-slate-50">
						<td className="px-4 py-3 text-sm text-slate-700">
							{task.description}
						</td>
						<td className="px-4 py-3 text-sm text-slate-700">
							{task.priority}
						</td>
						<td className="px-4 py-3 text-sm text-slate-700">
							{new Date(task.dueDate).toLocaleDateString("en-US", {
								month: "numeric",
								day: "numeric",
								year: "numeric",
							})}{" "}
						</td>
						<td className="px-4 py-3 text-sm text-slate-700">{task.status}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
