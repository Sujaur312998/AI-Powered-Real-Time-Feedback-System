const PRODUCT = require('../../models/product_model');

exports.productDetails = async (req, res) => {
    const { _id } = req.query;
    try {
        if (!_id) {
            return res.status(400).json({ message: "Missing '_id' query parameter." });
        }
        const _productDetails = await PRODUCT.findById(_id)
        if (!_productDetails) return res.status(404).json({ message: "Product Not Found" })

        return res.status(200).json({ message: _productDetails })
    } catch (error) {

    }
};
