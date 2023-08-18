"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddReplyForm = ({ c_Id, visible, mutate }) => {
    const [err, setErr] = useState(false);
    const session = useSession();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            session?.status === "unauthenticated" ||
            session?.status === "loading"
        ) {
            router.push("/dashboard/login");
        }
        if (session?.status === "authenticated") {
            const content = e.target[0].value;
            const commentId = c_Id;
            const username = session?.data?.user.name;

            const res = await fetch("/api/posts/reply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, commentId, content }),
            });
            e.target.reset();
            mutate();
            res.status === 500 && setErr(true);
            res.status === 200 && setErr(false);
        }
    };
    return (
        <form
            className={styles.commentForm}
            onSubmit={handleSubmit}
            style={{
                display: `${visible ? "block" : "none"}`,
                opacity: `${visible ? "100%" : "0"}`,
            }}
        >
            <textarea
                name="comment"
                placeholder="Add a Reply:"
                className={styles.commentArea}
                required
            ></textarea>
            <button type="submit" className={styles.button}>
                Reply
            </button>
            {err && <p className={styles.err}>Something went wrong!</p>}
        </form>
    );
};

export default AddReplyForm;
