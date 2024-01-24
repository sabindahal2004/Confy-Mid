import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdTime: {
        type: Date,
        default: () => new Date() // Use a default function for dynamic date
    }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
