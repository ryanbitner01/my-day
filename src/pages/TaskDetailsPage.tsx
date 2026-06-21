import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { taskService } from "../features/tasks/services";
import type { Task } from "@app-types/task.types";

export function TaskDetailsPage() {
	const formatDate = (date: Date) => date.toISOString().split("T")[0];

	const navigate = useNavigate();
	const task = useLoaderData() as Task | null;

	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
	const [dueDate, setDueDate] = useState("");
	const [status, setStatus] = useState<"To Do" | "In Progress" | "Done">(
		"To Do",
	);

	useEffect(() => {
		if (!task) return;
		setDescription(task.description);
		setPriority(task.priority);
		setStatus(task.status);
		setDueDate(formatDate(task.dueDate));
	}, [task]);

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		await taskService.saveTask({
			id: task?.id ?? crypto.randomUUID(),
			description,
			priority,
			dueDate: new Date(dueDate),
			status,
		});

		navigate("/tasks");
	};

	const isValid = description.trim() && dueDate && priority && status;
	const today = new Date().toISOString().split("T")[0];

	return (
		<div className="p-8">
			<header className="text-cyan-600 text-5xl pb-8">Task Details</header>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="description" className="block mb-2">
						Description
					</label>
					<input
						id="description"
						name="description"
						type="text"
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						placeholder="Enter a task description"
						className="w-full border border-slate-300 rounded px-3 py-2"></input>
				</div>

				<fieldset className="flex flex-col gap-2">
					<legend className=" font-medium text-slate-700">Priority</legend>

					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							name="priority"
							value="Low"
							checked={priority === "Low"}
							onChange={() => setPriority("Low")}
						/>
						Low
					</label>

					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							name="priority"
							value="Medium"
							checked={priority === "Medium"}
							onChange={() => setPriority("Medium")}
						/>
						Medium
					</label>

					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							name="priority"
							value="High"
							checked={priority === "High"}
							onChange={() => setPriority("High")}
						/>
						High
					</label>
				</fieldset>
				<div>
					<label htmlFor="dueDate">Due Date</label>
					<input
						id="dueDate"
						name="dueDate"
						type="date"
						value={dueDate}
						min={today}
						onChange={(event) => setDueDate(event.target.value)}
						className="w-full border border-slate-300 rounded px-3 py-2"></input>
				</div>

				<fieldset className="flex flex-col gap-2">
					<legend className=" font-medium text-slate-700">Status</legend>

					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							name="status"
							value="To Do"
							checked={status === "To Do"}
							onChange={() => setStatus("To Do")}
						/>
						To Do
					</label>

					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							name="status"
							value="In Progress"
							checked={status === "In Progress"}
							onChange={() => setStatus("In Progress")}
						/>
						In Progress
					</label>

					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							name="status"
							value="Done"
							checked={status === "Done"}
							onChange={() => setStatus("Done")}
						/>
						Done
					</label>
				</fieldset>

				<button
					className="cursor-pointer text-1xl text-gray-50 bg-cyan-600 shadow-sm grow-0 float-right px-2 py-1 rounded w-fit disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-400"
					type="submit"
					disabled={!isValid}>
					Save Changes
				</button>
			</form>
		</div>
	);
}
