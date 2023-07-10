import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");

    try {
        await connect();
        const user = await User.findOne(
            { name: username },
            { password: 0, _id: 0, createdAt: 0, email: 0 }
        );

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new NextResponse("Database Error", { status: 500 });
    }
};
