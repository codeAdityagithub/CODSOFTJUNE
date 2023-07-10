import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";
import Comment from "@/models/Comment";

export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        await connect();
        const post = await Post.findById(id);

        return new NextResponse(JSON.stringify(post), {
            status: 200,
        });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { id } = params;
    try {
        await connect();
        await Post.findByIdAndDelete(id);
        await Comment.deleteMany({ postId: id });
        return new NextResponse("Post Deleted", { status: 200 });
    } catch (error) {
        return new NextResponse("Database Error", { status: 500 });
    }
};
