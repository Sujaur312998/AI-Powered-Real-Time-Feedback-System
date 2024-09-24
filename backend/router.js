const express = require('express');
const router = express.Router();
const { webhook } = require('./src/Controlers/clerk-events'); // Destructure the addUser function

router.post('/webhook', webhook);

module.exports = router;
