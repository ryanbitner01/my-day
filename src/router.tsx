import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskDetailsPage } from "./pages/TaskDetailsPage";
import { taskService } from "./features/tasks/services";
import { ErrorPage } from "./pages/ErrorPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <DashboardPage />,
			},
			{
				path: "/tasks",
				element: <TasksPage />,
			},
			{
				path: "/tasks/new",
				element: <TaskDetailsPage />,
			},
			{
				path: "/tasks/:id",

				element: <TaskDetailsPage />,
				loader: async ({ params }) => {
					try {
						return await taskService.getTask(params.id!);
					} catch {
						throw new Response("Task not found", { status: 404 });
					}
				},
				errorElement: <ErrorPage />,
			},
		],
	},
]);
