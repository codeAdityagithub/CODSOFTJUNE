"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import styles from "./page.module.css";
import Bio from "@/components/profile/profilebio/Bio";
import About from "@/components/profile/profileabout/About";
import ProfilePosts from "@/components/profile/profilePosts/ProfilePosts";

const profileSections = [
    { id: 1, stitle: "About" },
    { id: 2, stitle: "Blog Posts" },
];

const UserProfile = ({ params }) => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, error, isLoading, mutate } = useSWR(
        `/api/profile/view?username=${params.username}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return (
        <div className={styles.container}>
            {!isLoading && data && (
                <Bio
                    name={data.name}
                    updatedAt={data.updatedAt}
                    email={false}
                />
            )}
            <div className={styles.statsContainer}>
                <div className={styles.sections}>
                    {profileSections.map((section) => (
                        <a
                            className={styles.section}
                            key={section.id}
                            href={`#${section.stitle}`}
                        >
                            {section.stitle}
                        </a>
                    ))}
                </div>
                <About />
                <ProfilePosts />
            </div>
        </div>
    );
};

export default UserProfile;
