const ORDER = require('../../models/order_model');

exports.getOrder = async (req, res) => {
    const { userID } = req.query; // Extract userID from query params
    const productPopulate={
        path:'productId',
        select:['productName', 'description', 'price']
    }
    try {
        const orders = await ORDER.find({ userID })
            .populate(productPopulate)

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        return res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};
