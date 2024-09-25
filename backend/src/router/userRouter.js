const express = require('express');
const router = express.Router();

const { webhook } = require('../Controlers/user/clerk-events'); // Destructure the addUser function
const { getuser } = require('../Controlers/user/getuser')
const { getAllUsers } = require('../Controlers/user/getalluser')
const { updateRole } = require('../Controlers/user/updateRole')

router.post('/webhook', webhook);
router.get('/getuser', getuser);
router.get('/getalluser', getAllUsers);
router.put('/updateRole', updateRole);

module.exports = router;
