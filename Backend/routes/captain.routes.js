const express=require ('express');
const router = express.Router();
const {body}=require('express-validator')
const captainController=require('../controller/captain.controller.js')
const authMiddleware=require('../middleware/auth.middleware.js')


//todo: Registering the cpatain
router.post('/register',[
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
  body('fullname.firstname').isLength({min: 5}).withMessage('Firstname must be at least 5 characters long'),
  body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
  body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
  body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
  body('vehicle.typeVehicle').isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicle type')
],
captainController.registerCaptain
)
//todo: Login the captain
router.post('/login',
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
  captainController.loginCaptain)

//TODO: visiting the profile of the captain
router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)

//TODO :logout the captain
router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)

  
module.exports=router;
