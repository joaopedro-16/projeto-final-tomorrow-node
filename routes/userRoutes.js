const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');

router.get('/login', userController.renderUserLogin)
router.get('/register', userController.renderUserRegister)

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser)

router.post('/posts', userController.authentication, userController.createPost)
router.get('/feed', userController.renderUserFeed)
router.get('/posts', userController.authentication, userController.getAllPosts)
router.delete('/posts/:id', userController.authentication, userController.deletePost);

module.exports = router