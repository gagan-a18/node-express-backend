import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Provide name'], minlength: 3, maxlength: 40 },
    email: { type: String, required: [true, 'Provide email'], match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Provide proper email address"], unique: true },
    password: { type: String, required: [true, 'Provide email'] }
})

export default mongoose.model('User', UserSchema);
