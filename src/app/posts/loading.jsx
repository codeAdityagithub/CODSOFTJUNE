import React from "react";
import styles from "./page.module.css";

const loading = () => {
    return (
        <div className={styles.loadcontainer}>
            <h1>loading...</h1>
        </div>
    );
};

export default loading;