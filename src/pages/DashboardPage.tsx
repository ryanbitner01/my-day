import { DashboardBasic } from "../features/dashboard/components/DashboardBasic";
import { RecentTasks } from "../features/dashboard/components/RecentTasks";
import { useDashboard } from "../features/dashboard/hooks/useDashboard";

export function DashboardPage() {
	const { dashboard, isLoading } = useDashboard();

	return (
		<div className="h-screen flex flex-col">
			<section className="flex-1 flex items-center gap-16 flex-col pt-8">
				<DashboardBasic
					totalTasks={dashboard?.totalTasks ?? 0}
					completedTasks={dashboard?.completedTasks ?? 0}
					isLoading={isLoading}></DashboardBasic>
				<RecentTasks recentTasks={dashboard?.recentTasks ?? []}></RecentTasks>
			</section>
		</div>
	);
}
