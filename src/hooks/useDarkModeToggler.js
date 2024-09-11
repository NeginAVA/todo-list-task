import { useState, useEffect } from "react";

const THEME_STORAGE_KEY = "theme";
const Theme = { Dark: "dark", Light: "light" };

// Function to determine initial theme based on localStorage or system preference
const getInitialTheme = () => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme) {
        return storedTheme === Theme.Dark;
    }
    // Fallback to system preference if no theme is stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export function useDarkModeToggler() {
    const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

    // Function to apply theme to the document and local storage
    const applyTheme = (isDark) => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem(THEME_STORAGE_KEY, isDark ? Theme.Dark : Theme.Light);
    };

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        applyTheme(newTheme);
        setIsDarkMode(newTheme);
    };

    useEffect(() => {
        applyTheme(isDarkMode);
    }, [isDarkMode]);

    return [isDarkMode, toggleTheme];
}
