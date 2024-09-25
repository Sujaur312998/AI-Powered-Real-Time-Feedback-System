const PRODUCT = require('../../models/product_model');
const USER = require('../../models/user_model')

exports.getProducts = async (req, res) => {
    const { addedby } = req.query;

    // Check if addedby is provided
    if (!addedby) {
        return res.status(400).json({ message: "Missing 'addedby' query parameter." });
    }

    try {
        // Retrieve products that match the addedby field
        const _user = await USER.findOne({ id: addedby }, 'role')
        if (_user.role==='admin') {
            const _products = await PRODUCT.find({ addedby: addedby });
            return res.status(200).json(_products);
        }
        const _products = await PRODUCT.find();
        return res.status(200).json(_products);

    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve products", error: error.message });
    }
};
