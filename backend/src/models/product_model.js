const mongoose = require("mongoose");

const PRODUCT = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: String,
            required: true,
            trim: true,
        },
        addedby: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("PRODUCT", PRODUCT);