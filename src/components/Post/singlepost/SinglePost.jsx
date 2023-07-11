"use client";
import React from "react";
import styles from "./post.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import Avatar from "@/components/profile/getProfileOthers/Avatar";
import useSWR from "swr";

const SinglePost = ({ id }) => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, error, isLoading, mutate } = useSWR(
        `/api/posts/${id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return (
        <div className={styles.container}>
            {isLoading && <h1>Loading...</h1>}
            {data && (
                <>
                    <div className={styles.top}>
                        <div className={styles.info}>
                            <div className={styles.title}>{data.title}</div>
                            <div className={styles.desc}>{data.desc}</div>
                            <Avatar username={data.username} />
                        </div>
                        <div className={styles.imageContainer}>
                            <Image
                                src={data.image}
                                alt="image"
                                fill={true}
                                className={styles.image}
                            />
                        </div>
                    </div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.content}>{data.content}</div>
                        <Comments id={id} />
                    </div>
                </>
            )}
        </div>
    );
};

export default SinglePost;
