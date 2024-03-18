import mongoose from "mongoose";


const TaskSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: [true, "Provide Name"], trim: true },
    completed: { type: Boolean, default: false }
})

export default mongoose.model('Task', TaskSchema);

