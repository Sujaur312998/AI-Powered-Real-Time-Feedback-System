const express = require('express');
const router = express.Router();

const { addOrder } = require('../Controlers/order/addOrder'); 



router.post('/addOrder', addOrder);



module.exports = router;
