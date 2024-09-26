const express = require('express');
const router = express.Router();

const { addOrder } = require('../Controlers/order/addOrder'); 
const { getOrder } = require('../Controlers/order/getOrder'); 
const { updateOrder } = require('../Controlers/order/updateOrder'); 
const { getOrderDetails } = require('../Controlers/order/getOrderDetails'); 
const { getFeedback } = require('../Controlers/order/getFeedback'); 



router.post('/addOrder', addOrder);
router.get('/getOrder', getOrder);
router.put('/updateOrder', updateOrder);
router.get('/getOrderDetails', getOrderDetails);
router.get('/getFeedback', getFeedback);



module.exports = router;
