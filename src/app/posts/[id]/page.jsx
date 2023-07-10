import React from "react";
import { notFound } from "next/navigation";

import styles from "./page.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import Avatar from "@/components/profile/getProfileOthers/Avatar";

export const metadata = {
    title: "BLOGiT - Post",
    description: "Enjoy Reading one of the posts from many writers.",
};

const getData = async (id) => {
    const res = await fetch(
        `https://codsoftjune-1ecd2bce3-codeadityagithub.vercel.app/api/posts/${id}`,
        {
            next: { revalidate: 5 },
        }
    );
    if (!res.ok) {
        return notFound();
    }

    return res.json();
};
// const getComments = async (id) => {
//     const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
//         cache: "no-store",
//     });
//     if (!res.ok) {
//         return notFound();
//     }

//     return res.json();
// };

const PostById = async ({ params }) => {
    const data = await getData(params.id);
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.info}>
                    <div className={styles.title}>{data.title}</div>
                    <div className={styles.desc}>{data.desc}</div>
                    <Avatar image={data.image} username={data.username} />
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
                <Comments id={params.id} />
            </div>
        </div>
    );
};

export default PostById;
