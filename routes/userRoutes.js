const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const { authentication } = require('../controllers/userController')

router.post('/login', userController.loginUser);

router.get('/users', authentication, userController.getAllUsers);


module.exports = router