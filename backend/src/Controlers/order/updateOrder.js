const ORDER = require('../../models/order_model')

exports.updateOrder = async (req, res) => {
    const { orderId, prompt, review } = req.body 
    try {
        if (!orderId) {
            return res.status(404).json({ message: "Order not Found!" })
        }

        const _order = await ORDER.findByIdAndUpdate(orderId, {
            $set: {
                feedback: prompt,
                review: review
            }
        }, { new: true })

        return res.status(201).json({ message: _order })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred while updating the order!" }) // More appropriate error message
    }
}
