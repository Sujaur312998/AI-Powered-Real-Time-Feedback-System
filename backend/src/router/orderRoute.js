const express = require('express');
const router = express.Router();

const { addOrder } = require('../Controlers/order/addOrder'); 
const { getOrder } = require('../Controlers/order/getOrder'); 



router.post('/addOrder', addOrder);
router.get('/getOrder', getOrder);



module.exports = router;
