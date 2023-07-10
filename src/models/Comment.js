import mongoose from "mongoose";

const { Schema } = mongoose;

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
    },
    { timestamps: true }
);

export default mongoose.models.Comment ||
    mongoose.model("Comment", commentSchema);
