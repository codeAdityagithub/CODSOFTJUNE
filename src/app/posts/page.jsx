import React from "react";


import AllPosts from "@/components/allposts/AllPosts";


export const metadata = {
    title: "BLOGiT - All Posts",
    description:
        "Immerse yourself in a world of inspiration, where passionatewriters share their expertise, personal experiences, and unique perspectives.",
};

export const revalidate = 60;

const getData = async () => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`);
    if(!res.ok) return [];
    const data = await res.json();
    return data;
};

const Posts = async () => {
    const posts = await getData();

    return (
        <AllPosts posts={posts} />
    );
};

export default Posts;
