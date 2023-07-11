"use client";
import React from "react";
import styles from "./profileposts.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";

import Postcard from "@/components/Post/Postcard";

const ProfilePosts = ({ username }) => {
    const session = useSession();

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, error, isLoading, mutate } = useSWR(
        `/api/posts?username=${username}`,
        fetcher
    );
    return (
        <div className={styles.profileContainer} id="Blog Posts">
            <h2>Posts</h2>
            <div className={styles.profileContent}>
                {!isLoading &&
                    data?.map((post) => (
                        <Postcard
                            title={post.title}
                            desc={post.desc}
                            img={post.image}
                            link={`/posts/${post._id}`}
                            key={post.id}
                            time={post.updatedAt}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ProfilePosts;
