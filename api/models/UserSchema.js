import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: '' // You can set a default value if appropriate
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    }
});

const User = mongoose.model("User", userSchema);
export default User;
