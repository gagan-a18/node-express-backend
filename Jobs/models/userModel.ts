import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UserDocument extends Document {
    _id: number,
    name: string,
    email: string,
    password: string,
    createJWT: () => void
}

const UserSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Provide name'], minlength: 3, maxlength: 40 },
    email: { type: String, required: [true, 'Provide email'], match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Provide proper email address"], unique: true },
    password: { type: String, required: [true, 'Provide password'] }
})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, `${process.env.JWT_SECRET}`, { expiresIn: "30d" });
}

export default mongoose.model<UserDocument>('User', UserSchema);
