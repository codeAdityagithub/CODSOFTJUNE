"use client";
import React, { useState } from "react";
import styles from "./comment.module.css";
import AddReplyForm from "@/components/addReplyForm/AddReplyForm";

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

const CommentElement = ({ comment, mutate }) => {
    const [formvisible, setFormVisible] = useState(false);
    const [repliesVisible, setRepliesVisible] = useState(false);

    const openForm = () => {
        setFormVisible((prev) => !prev);
    };
    const openReplies = () => {
        setRepliesVisible((prev) => !prev);
    };

    return (
        <div className={styles.commentContainer}>
            <div className={styles.header}>
                <div className={styles.username}>{comment.username}</div>
                <div className={styles.time}>
                    <TimeAgo date={new Date(comment.updatedAt)} />
                </div>
            </div>
            <div className={styles.content}>{comment.content}</div>
            <div className={styles.stats}>
                <div className={styles.likes}>Likes</div>
                <div className={styles.dislikes}>Dislikes</div>
                <div className={styles.replyButton} onClick={openForm}>
                    Reply
                </div>
            </div>
            <AddReplyForm
                visible={formvisible}
                c_Id={comment._id}
                mutate={mutate}
            />
            <div className={styles.openReplyButton} onClick={openReplies}>
                {comment.replies.length == 1
                    ? "1 Reply"
                    : `${comment.replies.length} Replies`}
            </div>
            {comment.replies.map((reply) => (
                <div
                    className={styles.replyContainer}
                    style={{
                        height: `${repliesVisible ? "100%" : "0"}`,
                        opacity: `${repliesVisible ? "100%" : "0"}`,
                        transition: "0.3s all",
                        transformOrigin: "top",
                    }}
                    key={reply._id}
                >
                    <div className={styles.header}>
                        <div className={styles.username}>{reply.username}</div>
                        <div className={styles.time}>
                            <TimeAgo date={new Date(reply.updatedAt)} />
                        </div>
                    </div>
                    <div className={styles.content}>{reply.content}</div>
                    <div className={styles.stats}>
                        <div className={styles.likes}>Likes</div>
                        <div className={styles.dislikes}>Dislikes</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentElement;
