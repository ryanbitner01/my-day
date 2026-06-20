interface DashboardBasicProps {
	totalTasks?: number;
	completedTasks?: number;
	isLoading: boolean;
}

export function DashboardBasic({
	totalTasks,
	completedTasks,
	isLoading,
}: DashboardBasicProps) {
	return (
		<div className=" rounded-lg px-8 py-8 shadow-sm bg-cyan-600 flex gap-4  flex-col  max-w-lg w-full min-w-sm">
			<header className=" font-bold  text-5xl text-gray-50  text-5xl">
				Dashboard
			</header>

			<div className="flex gap-2 justify-between text-2xl">
				<h2
					className="text-gray-50 
">
					Total Tasks
				</h2>
				<p className="text-gray-100">{isLoading ? "-" : totalTasks}</p>
			</div>

			<div className="flex gap-2 justify-between text-2xl">
				<h2
					className="text-gray-50 
">
					Completed
				</h2>
				<p className="text-gray-100">{isLoading ? "-" : completedTasks}</p>
			</div>
		</div>
	);
}
