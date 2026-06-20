import type { Dashboard } from "../types/dashboard.types";

export interface DashboardService {
	getDashboard(): Promise<Dashboard>;
}
