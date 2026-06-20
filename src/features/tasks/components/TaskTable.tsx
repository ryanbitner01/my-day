import type { Task } from "@app-types/task.types";

interface TaskTableProps {
	tasks: Task[];
}

export function TaskTable({ tasks }: TaskTableProps) {
	return (
		<table>
			<thead>
				<tr>
					<th>Task</th>
					<th>Priority</th>
					<th>Due Date</th>
					<th>Status</th>
				</tr>
			</thead>

			<tbody>
				{tasks.map((task) => (
					<tr key={task.id}>
						<td>{task.description}</td>
						<td>{task.priority}</td>
						<td>{task.dueDate.toString()}</td>
						<td>{task.status}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
