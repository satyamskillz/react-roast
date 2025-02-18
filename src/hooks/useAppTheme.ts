import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// Custom hook to get and track the app theme
export default function useAppTheme() {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		// Function to update theme state
		const updateTheme = () => {
			const storedTheme = localStorage.getItem("theme") as Theme | null;
			if (storedTheme) {
				setTheme(storedTheme);
			} else {
				const prefersDark = window?.matchMedia("(prefers-color-scheme: dark)").matches;
				setTheme(prefersDark ? "dark" : "light");
			}
		};

		// Initial theme check
		updateTheme();

		// Listen for changes in localStorage
		const storageListener = () => updateTheme();
		window?.addEventListener("storage", storageListener);

		// Listen for system theme changes
		const mediaQuery = window?.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", updateTheme);

		return () => {
			window?.removeEventListener("storage", storageListener);
			mediaQuery.removeEventListener("change", updateTheme);
		};
	}, []);

	return theme;
}
