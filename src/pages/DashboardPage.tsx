import { DashboardBasic } from "../features/dashboard/components/DashboardBasic";
import { RecentTasks } from "../features/dashboard/components/RecentTasks";

export function DashboardPage() {
	return (
		<div className="h-screen flex flex-col">
			<section className="flex-1 flex items-center gap-16 flex-col pt-8">
				<DashboardBasic totalTasks={28} completedTasks={18}></DashboardBasic>
				<RecentTasks
					recentTasks={["fix bug", "Implement Authentication"]}></RecentTasks>
			</section>
		</div>
	);
}
