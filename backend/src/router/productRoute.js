const express = require('express');
const router = express.Router();

const { addProduct } = require('../Controlers/product/addNewProduct'); 
const { getProducts } = require('../Controlers/product/getProducts'); 
const { productDetails } = require('../Controlers/product/productDetails'); 


router.post('/addproduct', addProduct);
router.get('/getProducts', getProducts);
router.get('/productDetails', productDetails);


module.exports = router;
