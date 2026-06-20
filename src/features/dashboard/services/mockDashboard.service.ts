import type { Dashboard } from "../types/dashboard.types";
import type { DashboardService } from "./dasboard.service";

export const mockDashboardService: DashboardService = {
	async getDashboard(): Promise<Dashboard> {
		return {
			completedTasks: 18,
			totalTasks: 28,
			recentTasks: ["Fix Bug", "Implement Authentication"],
		};
	},
};
