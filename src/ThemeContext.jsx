/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
import { theme } from "./Keys";

export const ThemeContext = createContext();

function getTheme() {
    if (localStorage.getItem("currentTheme")) {
        return localStorage.getItem("currentTheme");
    }
    if (!window.matchMedia) return null;

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    if (query.matches) {
        console.log("dark mode");
        return theme.themeC;
    } else if (!query.matches) {
        console.log("light mode");
        return theme.themeB;
    }

    return null;
}

export function ThemeContextProvider({ children }) {
    //if the theme retrieved from local storage is null use themeA
    const [currentTheme, setCurrentTheme] = useState(
        getTheme() || theme.themeA
    );

    function updateTheme(theme) {
        setCurrentTheme(theme);

        //save this theme to local storage
        localStorage.setItem("currentTheme", theme);
    }

    return (
        <ThemeContext.Provider value={{ currentTheme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
