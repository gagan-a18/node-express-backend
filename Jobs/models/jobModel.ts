import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company: { type: String, required: [true, "Company Requried"], maxlength: 50 },
    position: { type: String, required: [true, "Position Requried"], maxlength: 100 },
    status: { type: String, enum: ['interview', 'declined', 'pending'], default: "pending" },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: [true, 'Please Provide User'] }
}, { timestamps: true })

export default mongoose.model('Jobs', JobSchema);