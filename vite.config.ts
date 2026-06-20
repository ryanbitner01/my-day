import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		environment: "jsdom",
		coverage: {
			provider: "v8", // or "c8"/"istanbul"
			reporter: ["text", "lcov", "html"],
			reportsDirectory: "coverage",
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
});
