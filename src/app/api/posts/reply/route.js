import Comment from "@/models/Comment";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { username, commentId, content } = await request.json();
    try {
        await connect();
        const comment = await Comment.findById(commentId);
        comment.replies = [...comment.replies, { username, content }];
        comment.save();

        return new NextResponse("Reply Added", { status: 200 });
    } catch (error) {
        return new NextResponse("Cannot get Comments", { status: 500 });
    }
};
