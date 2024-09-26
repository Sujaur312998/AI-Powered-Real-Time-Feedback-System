const ORDER = require('../../models/order_model');

exports.getFeedback = async (req, res) => {
    try {
        // Fetch only the 'review' field from the ORDER model
        const ordersWithReviews = await ORDER.find({ review: { $exists: true, $ne: null } }, { review: 1, _id: 1 });


        return res.status(200).json({ message: ordersWithReviews });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};
