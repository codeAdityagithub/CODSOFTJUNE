"use client";
import React, { useContext } from "react";
import styles from "./ModeToggle.module.css";
import { ThemeContext } from "@/context/ThemeContext";

const ModeToggle = () => {
    const { toggle, mode } = useContext(ThemeContext);
    return (
        <div className={styles.container} onClick={toggle}>
            <div className={styles.icon}>🌙</div>
            <div className={styles.icon}>☀️</div>
            <div
                className={styles.toggle}
                style={mode === "dark" ? { right: "2px" } : { left: "2px" }}
            ></div>
        </div>
    );
};

export default ModeToggle;
