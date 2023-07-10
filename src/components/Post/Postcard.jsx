import React from "react";
import styles from "./post.module.css";
import Image from "next/image";
import Link from "next/link";

const post = ({ title, desc, img, link, time }) => {
    const date = new Date(time);

    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    return (
        <Link className={styles.postcontainer} href={link}>
            <div className={styles.imagecontainer}>
                <Image src={img} fill={true} alt="not found" />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.date}>
                    {day + " " + month + " " + year}
                </div>
                <div className={styles.title}>{title}</div>
                <div className={styles.desc}>{desc}</div>
                <div className={styles.read}>Read More</div>
            </div>
        </Link>
    );
};

export default post;
