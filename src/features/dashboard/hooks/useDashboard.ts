import { useEffect, useState } from "react";
import type { Dashboard } from "../types/dashboard.types";
import { dashboardService } from "../services";

export function useDashboard() {
	const [getDashboard, setDashboard] = useState<Dashboard | null>(null);
	const [getIsLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		dashboardService
			.getDashboard()
			.then((dashboard) => setDashboard(dashboard))
			.finally(() => setIsLoading(false));
	});

	return {
		dashboard: getDashboard,
		isLoading: getIsLoading,
	};
}
