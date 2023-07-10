import React from "react";
import Image from "next/image";
import styles from "./bio.module.css";

const Bio = ({ name, updatedAt, email }) => {
    return (
        <div className={styles.bio}>
            <div className={styles.imageContainer}>
                <Image
                    src={"/person-circle-outline.svg"}
                    alt="imagenotfound"
                    fill={true}
                />
            </div>

            <div className={styles.credentials}>
                <div className={styles.row}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.updatedAt}>
                        Last Updated:
                        {new Date(updatedAt).toLocaleDateString()}
                    </div>
                </div>
                {email && <div className={styles.email}>Email: {email}</div>}
            </div>
        </div>
    );
};

export default Bio;
