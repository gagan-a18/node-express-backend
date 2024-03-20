import mongoose from "mongoose";

const connectdb = (url: string) => {
    return mongoose.connect(url);
}

export default connectdb