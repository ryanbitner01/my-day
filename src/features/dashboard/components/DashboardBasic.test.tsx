import { render, screen } from "@testing-library/react";
import { DashboardBasic } from "./DashboardBasic";

describe("DashboardBasic", () => {
	it("shows a placeholder hyphon when loading", () => {
		render(
			<DashboardBasic
				totalTasks={0}
				completedTasks={0}
				isLoading={true}></DashboardBasic>,
		);
		expect(screen.getByTestId("total-tasks-value").textContent).toBe("-");
		expect(screen.getByTestId("completed-tasks-value").textContent).toBe("-");
	});

	it("shows numbers when initialized with numbers and no loading", () => {
		render(
			<DashboardBasic
				totalTasks={20}
				completedTasks={18}
				isLoading={false}></DashboardBasic>,
		);
		expect(screen.getByTestId("total-tasks-value").textContent).toBe("20");
		expect(screen.getByTestId("completed-tasks-value").textContent).toBe("18");
	});
});
