"use client";
import React from "react";
import styles from "./avatar.module.css";
import Link from "next/link";
import Image from "next/image";

const Avatar = ({ username }) => {
    return (
        <Link className={styles.avatar} href={`/profiles/${username}`}>
            <Image
                src={"/person-circle-outline.svg"}
                alt="icon"
                width={40}
                height={40}
                className={styles.icon}
            />
            {username}
        </Link>
    );
};

export default Avatar;
