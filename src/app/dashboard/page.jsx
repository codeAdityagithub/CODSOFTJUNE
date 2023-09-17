"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";

const allowedHosts = ["images.pexels.com", "images.unsplash.com"];

const Dashboard = () => {
    const [err, setErr] = useState(null);

    const session = useSession();
    const router = useRouter();

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, error, isLoading, mutate } = useSWR(
        `/api/posts?username=${session?.data?.user.name}`,
        fetcher
    );

    if (session.status === "loading") {
        return <h3>Loading...</h3>;
    }
    // if (session.status === "unauthenticated") {
    //     router?.push("/dashboard/login?callbackUrl=/dashboard");
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        const desc = e.target[1].value;
        const image = e.target[2].value.toLowerCase();
        const content = e.target[3].value;
        const username = session?.data?.user.name;
        try {
            const url = new URL(image);
            if (!allowedHosts.includes(url.hostname)) {
                setErr("image host not allowed!");
                return;
            }
        } catch (err) {
            setErr("Type a valid image url!");
            return;
        }

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, desc, image, content, username }),
            });
            e.target.reset();
            mutate();
            setErr(null);
        } catch (err) {
            setErr("Could not post your blog, Try again!");
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });
            setErr(null);

            mutate();
        } catch (err) {
            setErr("Could not delete your blog, Try again!");
        }
    };
    if (session.status === "authenticated") {
        return (
            <div className={styles.container}>
                <div className={styles.allPosts}>
                    <h2>All Your Posts</h2>
                    <div className={styles.posts}>
                        {isLoading
                            ? "Loading..."
                            : data?.map((post) => (
                                  <div className={styles.post} key={post._id}>
                                      <div className={styles.imgContainer}>
                                          <Image
                                              src={post.image}
                                              alt="/imagenotfound.png"
                                              fill={true}
                                          />
                                      </div>
                                      <div className={styles.postTitle}>
                                          {post.title}
                                      </div>
                                      <span
                                          className={styles.delete}
                                          onClick={() => handleDelete(post._id)}
                                      >
                                          X
                                      </span>
                                  </div>
                              ))}
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h2>Add New Post</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            className={styles.input}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Desc"
                            className={styles.input}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Image"
                            className={styles.input}
                            required
                        />
                        <p style={{ fontSize: "0.8rem", color: "#bbb" }}>
                            Only Pexels and Unsplash images
                        </p>
                        <textarea
                            placeholder="Content"
                            className={styles.textArea}
                            cols="30"
                            rows="10"
                            required
                        ></textarea>
                        <button className={styles.button}>Upload</button>
                        {err && (
                            <p style={{ marginTop: "1rem", color: "red" }}>
                                {err}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        );
    }
};

export default Dashboard;
