import { useRouteError, isRouteErrorResponse } from "react-router";

export function ErrorPage() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<div className="p-8">
				<h1 className="text-3xl font-semibold text-slate-800">
					{error.status} {error.statusText || "Error"}
				</h1>
				<p className="mt-4 text-slate-600">
					{typeof error.data === "string"
						? error.data
						: error.data?.message ||
							"We could not load this page. Please try again."}
				</p>
			</div>
		);
	}

	return (
		<div className="p-8">
			<h1 className="text-3xl font-semibold text-slate-800">
				Something went wrong
			</h1>
			<p className="mt-4 text-slate-600">
				{error instanceof Error
					? error.message
					: "An unexpected error occurred."}
			</p>
		</div>
	);
}
