interface RecentTasksProps {
	recentTasks: string[];
}

export function RecentTasks(props: RecentTasksProps) {
	return (
		<section className="w-full max-w-lg min-w-sm ">
			<div className="text-center font-bold text-4xl pb-4">
				Recently Completed
			</div>
			{props.recentTasks.map((task) => {
				return <div className="flex flex-col gap-2 text-2xl">{task}</div>;
			})}
		</section>
	);
}
