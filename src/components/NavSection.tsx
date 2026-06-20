import { NavLink } from "react-router";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
	isActive ? "underline " : "";

export function NavSection() {
	return (
		<div className="w-3xs bg-cyan-600 flex flex-col ">
			<header className="px-6 py-4 border-b text-gray-50">
				<h1 className="text-2xl font-bold">My Day</h1>
			</header>
			<ul className="text-2xl gap-4 flex flex-col text-gray-50 p-12  grow-1">
				<li>
					<NavLink to="/" className={navLinkClass}>
						Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink to="/tasks" className={navLinkClass}>
						Tasks
					</NavLink>
				</li>
			</ul>
			<footer className="px-6 py-4 border-t text-sm text-gray-50">
				© 2026 My Day
			</footer>
		</div>
	);
}
