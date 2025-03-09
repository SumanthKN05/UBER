const express = require('express');   
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controller/user.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');





//todo: Registering the user
router.post('/register', [
  body('email').isEmail().withMessage('Please enter a valid Email'),
  body('fullname.firstname').isLength({ min: 5 }).withMessage('Firstname must be at least 5 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.registerUser);

//todo: Login the user
router.post('/login',[
  body('email').isEmail().withMessage('Please enter a valid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.loginUser);

//todo:visiting the profile of the user
router.get('/profile',authMiddleware.authUser, userController.getUserProfile);

//todo:logout the user
router.post('/logout',authMiddleware.authUser, userController.logoutUser);






module.exports = router;