"use client";
import React, { useState } from "react";
import styles from "./addcomment.module.css";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const AddCommentForm = ({ id, mutate }) => {
    const [err, setErr] = useState(false);
    const session = useSession();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            session?.status === "unauthenticated" ||
            session?.status === "loading"
        ) {
            router.push("/userauth/login?callbackUrl=/posts");
        }
        if (session?.status === "authenticated") {
            const content = e.target[0].value;
            const postId = id;
            const username = session?.data?.user.name;

            const res = await fetch("/api/posts/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, postId, content }),
            });
            e.target.reset();
            mutate();
            res.status === 500 && setErr(true);
            res.status === 200 && setErr(false);
        }
    };
    return (
        <form className={styles.commentForm} onSubmit={handleSubmit}>
            <textarea
                name="comment"
                placeholder="Add a comment:"
                className={styles.commentArea}
                required
            ></textarea>
            <button type="submit" className={styles.button}>
                Comment
            </button>
            {err && <p className={styles.err}>Something went wrong!</p>}
        </form>
    );
};

export default AddCommentForm;
