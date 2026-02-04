import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    slug: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        default: [],
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 2
    },
    images: {
        type: [String],
        default: []
    },
    description: {
        type: String, required: true
    }
}, { timestamps: true });

const productModel = mongoose.model('product', productSchema);

export default productModel;