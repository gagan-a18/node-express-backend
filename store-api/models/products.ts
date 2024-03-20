import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name Required'] },
    price: { type: Number, required: [true, 'Product Price Required'] },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    createdAt: { type: Date, default: Date.now() },
    company: { type: String, enum: { values: ['ikea', 'caressa', 'liddy', 'marcos'], message: '{VALUE} is not supported' } }
})

export default mongoose.model('Product', productSchema);