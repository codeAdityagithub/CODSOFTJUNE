import mongoose from "mongoose";

const { Schema } = mongoose;

const replySchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const commentSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        postId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        replies: {
            type: [replySchema],
        },
    },
    { timestamps: true }
);

export default mongoose.models.Comment ||
    mongoose.model("Comment", commentSchema);
