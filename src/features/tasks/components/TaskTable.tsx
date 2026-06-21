import type { Task } from "@app-types/task.types";

interface TaskTableProps {
	tasks: Task[];
}

export function TaskTable({ tasks }: TaskTableProps) {
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
					<tr key={task.id} className="hover:bg-slate-50">
						<td className="px-4 py-3 text-sm text-slate-700">
							{task.description}
						</td>
						<td className="px-4 py-3 text-sm text-slate-700">
							{task.priority}
						</td>
						<td className="px-4 py-3 text-sm text-slate-700">
							{task.dueDate.toString()}
						</td>
						<td className="px-4 py-3 text-sm text-slate-700">{task.status}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
