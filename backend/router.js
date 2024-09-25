const express = require('express');
const router = express.Router();
const { webhook } = require('./src/Controlers/clerk-events'); // Destructure the addUser function
const { getuser } = require('./src/Controlers/getuser')
const { getAllUsers } = require('./src/Controlers/getalluser')
const { updateRole } = require('./src/Controlers/updateRole')

router.post('/webhook', webhook);
router.get('/getuser', getuser);
router.get('/getalluser', getAllUsers);
router.put('/updateRole', updateRole);

module.exports = router;
