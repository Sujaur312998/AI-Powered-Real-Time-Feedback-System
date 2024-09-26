const mongoose = require("mongoose");

const ORDER = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
            trim: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PRODUCT",
        },
        feedback:{
            type: String,
            trim: true,
        },
        review:{
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("ORDER", ORDER);