const ORDER = require('../../models/order_model')

exports.addOrder =async (req, res) => {
    const { userID, productId } = req.body
    try {
        const _order= new ORDER({
            userID, productId
        })
        await _order.save()
        return res.status(201).json({message:_order})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Wrong Order"})
    }
}