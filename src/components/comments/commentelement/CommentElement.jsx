"use client";
import React, { useState } from "react";
import styles from "./comment.module.css";

function TimeAgo({ date }) {
    const getTimeAgo = (date) => {
        const now = new Date();
        const diff = Math.abs(now - date);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const years = Math.floor(days / 365);

        if (years > 0) {
            return `${years} year${years === 1 ? "" : "s"} ago`;
        } else if (weeks > 0) {
            return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
        } else if (days > 0) {
            return `${days} day${days === 1 ? "" : "s"} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours === 1 ? "" : "s"} ago`;
        } else {
            return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
        }
    };

    return <div>{getTimeAgo(date)}</div>;
}

const CommentElement = ({ comment }) => {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.header}>
                <div className={styles.username}>{comment.username}</div>
                <div className={styles.time}>
                    <TimeAgo date={new Date(comment.updatedAt)} />
                </div>
            </div>
            <div className={styles.content}>{comment.content}</div>
        </div>
    );
};

export default CommentElement;
