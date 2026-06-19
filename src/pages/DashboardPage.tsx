export function DashboardPage() {
	return (
		<div className="h-screen flex flex-col">
			<header className="text-center p-8 text-5xl">Dashboard</header>
			<section className="flex-1 flex items-center gap-8 flex-col pt-8">
				<div className="w-fit rounded-lg  p-4 shadow-sm bg-sky-600 flex gap-4 items-center text-2xl">
					<h2
						className="text-gray-50 font-bold
">
						Total Tasks
					</h2>
					<p className="text-gray-100">24</p>
				</div>

				<div className="w-fit rounded-lg  p-4 shadow-sm bg-sky-600 flex gap-4 items-center text-2xl">
					<h2
						className="text-gray-50 font-bold
">
						Completed
					</h2>
					<p className="text-gray-100">18</p>
				</div>
				<div>Recently Completed</div>
			</section>
		</div>
	);
}
