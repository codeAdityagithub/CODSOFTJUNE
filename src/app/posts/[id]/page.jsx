import React from "react";
import { notFound } from "next/navigation";

import SinglePost from "@/components/Post/singlepost/SinglePost";

export const metadata = {
    title: "BLOGiT - Post",
    description: "Enjoy Reading one of the posts from many writers.",
};

const PostById = async ({ params }) => {
    return <SinglePost id={params.id} />;
};

export default PostById;
