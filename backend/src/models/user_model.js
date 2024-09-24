const mongoose = require("mongoose");

const USER = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            required: true,
            trim: true,
            enum: ['admin', 'customer'], 
            default: 'customer', 
        },
    },
    {
        timestamps: true, 
    }
)

module.exports = mongoose.model("USER", USER);