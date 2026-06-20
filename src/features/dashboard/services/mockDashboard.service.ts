import type { Dashboard } from "../types/dashboard.types";
import type { DashboardService } from "./dashboard.service";

export const mockDashboardService: DashboardService = {
	async getDashboard(): Promise<Dashboard> {
		return {
			completedTasks: 18,
			totalTasks: 28,
			recentTasks: ["Fix Bug", "Implement Authentication"],
		};
	},
};
