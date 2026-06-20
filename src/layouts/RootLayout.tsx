import { Outlet } from "react-router";
import { NavSection } from "../components/NavSection";

export function RootLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex flex-1">
				<NavSection />
				<div className="flex-1">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
