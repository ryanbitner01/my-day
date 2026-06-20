import { render, screen } from "@testing-library/react";
import { RecentTasks } from "./RecentTasks";

describe("RecentTasks", () => {
	it("Shows tasks when initialized with tasks", async () => {
		const tasks = ["Fixed the bug", "Checked Initialize Logic"];
		render(<RecentTasks recentTasks={tasks}></RecentTasks>);

		for (const task of tasks) {
			expect(await screen.findByText(task)).toBeInTheDocument();
		}
	});
});
