const ORDER = require('../../models/order_model')


exports.getOrderDetails = async (req, res) => {
    const { o_id } = req.query
    // if(!o_id){
    //     return res.status(404).json({message:'Order not Found'})
    // }
    const _order = await ORDER.findById(o_id)
    return res.status(200).json({message:_order})


}