const PRODUCT = require('../../models/product_model')

exports.addProduct = async (req, res) => {
    try {
        const { productName, description, price, addedby } = req.body
        const _product = new PRODUCT({ productName, description, price, addedby })
        await _product.save()
        return res.status(201).json(_product)
    } catch (error) {
        return res.status(500).json({message:"Failed to add a product"})
    }
};
