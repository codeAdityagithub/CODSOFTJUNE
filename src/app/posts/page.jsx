import React from "react";

import AllPosts from "@/components/allposts/AllPosts";

export const metadata = {
    title: "BLOGiT - All Posts",
    description:
        "Immerse yourself in a world of inspiration, where passionatewriters share their expertise, personal experiences, and unique perspectives.",
};

const getData = async () => {
    const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }

    return res.json();
};

const page = async () => {
    const posts = await getData();

    return <AllPosts posts={posts} />;
};

export default page;
