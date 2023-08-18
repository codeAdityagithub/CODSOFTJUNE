import Comment from "@/models/Comment";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const url = new URL(request.url);
    const postId = url.searchParams.get("postid");

    try {
        await connect();
        const comments = await Comment.find({ postId: postId });

        return new NextResponse(JSON.stringify(comments), { status: 200 });
    } catch (error) {
        return new NextResponse("Cannot get Comments", { status: 500 });
    }
};

export const POST = async (request) => {
    const body = await request.json();
    // console.log(body);

    try {
        await connect();
        const comment = new Comment(body);
        await comment.save();
        return new NextResponse("Comment Posted", { status: 200 });
    } catch (error) {
        return new NextResponse("Cannot Post Comment", { status: 500 });
    }
};
