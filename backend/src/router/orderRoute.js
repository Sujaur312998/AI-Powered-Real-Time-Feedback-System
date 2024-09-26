const express = require('express');
const router = express.Router();

const { addOrder } = require('../Controlers/order/addOrder'); 
const { getOrder } = require('../Controlers/order/getOrder'); 
const { updateOrder } = require('../Controlers/order/updateOrder'); 



router.post('/addOrder', addOrder);
router.get('/getOrder', getOrder);
router.put('/updateOrder', updateOrder);



module.exports = router;
