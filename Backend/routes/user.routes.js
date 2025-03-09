const express = require('express');   
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controller/user.controller.js');

router.post('/register', [
  body('email').isEmail().withMessage('Please enter a valid Email'),
  body('fullname.firstname').isLength({ min: 5 }).withMessage('Firstname must be at least 5 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.registerUser);


router.post('/login',[
  body('email').isEmail().withMessage('Please enter a valid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.loginUser);







module.exports = router;