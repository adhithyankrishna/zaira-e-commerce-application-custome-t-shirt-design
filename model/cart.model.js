const mongoose = require("mongoose");


// Define the Item Schema
const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String, // Correct type for name
            required: true,
        },
        itemId: {
            type: String, // Use String for UUIDs
            required: true
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt
    }
);

// Define the Cart Schema
const cartSchema = new mongoose.Schema(
    {
        user_id: {
            type: String, // Use String for UUIDs
            required: true,
        },
        items: {
            type: [itemSchema], // Reference the itemSchema
            required: false, // Items are optional
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt
    }
);

// Create and export the Cart model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
