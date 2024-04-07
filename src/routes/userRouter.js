const express = require('express');
const { registerUser, loginUser } = require('../controllers/SBuserController');

const router = express.Router();

/**
 * routes for auth
 */
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
