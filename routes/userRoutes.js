const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const { authentication } = require('../controllers/userController')

router.get("/", userController.renderUserLogin)

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser)

// router.post('/feed', authentication, userController.getAllUsers)


module.exports = router