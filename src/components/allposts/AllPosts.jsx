"use client";
import React, { useState } from "react";

import Postcard from "@/components/Post/Postcard";
import styles from "@/app/posts/page.module.css";

const AllPosts = ({ posts }) => {
    const [query, setQuery] = useState("");
    const filteredPosts = (array) => {
        return array.filter(
            (e) =>
                e.title.toLowerCase().includes(query) ||
                e.username.toLowerCase().includes(query)
        );
    };
    const filtered = filteredPosts(posts);
    return (
        <>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    className={styles.input}
                    value={query}
                    placeholder="Search Posts..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                {/* <button className={styles.button}>Search</button> */}
            </div>
            <div className={styles.container}>
                {filtered.length === 0 && (
                    <h2 className={styles.h2}>No such posts available 😓</h2>
                )}
                {filtered.map((post) => {
                    return (
                        <Postcard
                            title={post.title}
                            desc={post.desc}
                            img={post.image}
                            link={`/posts/${post._id}`}
                            key={post.id}
                            time={post.updatedAt}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default AllPosts;
