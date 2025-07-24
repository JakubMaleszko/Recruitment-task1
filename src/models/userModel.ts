import mongoose, { Schema } from "mongoose";
import { blob } from "stream/consumers";

const userSchema = new Schema({
    "username": String,
    "token": String,
    "permissions": {
        type: [String],
        enum: ['read', 'write'],
        default: []
    },
    "isAdmin": Boolean
}
);

export default mongoose.model('User', userSchema);