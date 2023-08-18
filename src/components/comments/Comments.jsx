"use client";
import React, { useState } from "react";
import useSWR from "swr";

import AddCommentForm from "@/components/addcommentform/AddCommentForm";

import styles from "./comments.module.css";
import CommentElement from "./commentelement/CommentElement";

const Comments = ({ id }) => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, error, isLoading, mutate } = useSWR(
        `/api/posts/comment?postid=${id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    return (
        <div className={styles.commentsContainer}>
            <div className={styles.commentsHeader}>
                <h3>Comments</h3>
                <AddCommentForm id={id} mutate={mutate} />
            </div>
            <div className={styles.comments}>
                {isLoading
                    ? "Loading..."
                    : data?.map((comment) => (
                          <>
                              <CommentElement
                                  comment={comment}
                                  key={comment._id}
                                  mutate={mutate}
                              />
                          </>
                      ))}
            </div>
        </div>
    );
};

export default Comments;
