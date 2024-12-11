const mongoose = require('mongoose');

const descriptionSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const optionSchema = new mongoose.Schema({
    optionName: {
        type: String,
        required: true
    },
    optionValue: {
        type: String,
        required: true
    }
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    about: {
        type: [String], // Array of strings for key points
        required: true
    },
    description: {
        type: [descriptionSchema], // Array of key-value pairs
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true // Examples: 'Laptop', 'Smartphone', etc.
    },
    price: {
        type: Number,
        required: true,
    },
    dimensions: {
        type: String, // E.g., "15 x 10 x 1 inches"
        required: true
    },
    options: {
        type: [optionSchema] // Possible variants, e.g., color: red, storage: 128GB
    },
    stock: {
        type: Number,
        required: true,
        min: 0 // Stock should not be negative
    },
    imageUrl: [{
        type: String,
        required: true,
    }],
    avgRating: {
        type: Number,
        default: 0, // Default average rating is 0
        min: 0,
        max: 5
    },
    totalRatings: {
        type: Number,
        default: 0, // Default total number of ratings is 0
        min: 0
    },
    totalPurchased: {
        type: Number,
        default: 0, // Tracks how many times the product has been purchased
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
