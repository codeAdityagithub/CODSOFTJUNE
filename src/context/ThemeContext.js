"use client";

const { useState, createContext, useEffect } = require("react");

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState("light");

    useEffect(() => {
        const md = localStorage.getItem("PreferedMode");
        setMode(md);
    }, []);

    const toggle = () => {
        setMode((prev) => {
            if (prev === "dark") {
                localStorage.setItem("PreferedMode", "light");
                return "light";
            } else {
                localStorage.setItem("PreferedMode", "dark");
                return "dark";
            }
        });
    };

    return (
        <ThemeContext.Provider value={{ toggle, mode }}>
            <div className={`theme ${mode}`}>{children}</div>
        </ThemeContext.Provider>
    );
};
