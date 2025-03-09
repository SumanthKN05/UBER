const userModel = require('../models/user.model.js');
const userServices = require('../services/user.service.js');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model.js');

// Authentication

module.exports.registerUser = async (req, res, next) => {
  // checking the error from the register user validation we did in the routes and sending response
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  const { fullname, email, password } = req.body;

  const userAlreadyExisted=await userModel.findOne({email});
  if(userAlreadyExisted){
    return res.status(400).json({message:"User already exist"});
  }

  // todo: hashing before sending into db
  const hashedPassword = await userModel.hashPassword(password); // using the hashPassword method which we created in user model

  // todo: creating user in db using the user service in the services folder
  const user = await userServices.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,   // we are destructuring the fullname object and sending the firstname and lastname separately
    email,
    password: hashedPassword
  });

  const token = user.generateToken();
  res.status(201).json({ user, token });
};

module.exports.loginUser = async (req, res, next) => {
  // Checking validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate token
  const token = user.generateToken();

  // ✅ Set cookie **before sending response**
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // Change to true if using HTTPS
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // ✅ Send final response
  res.status(200).json({ message: 'Login successful', token });
};


module.exports.getUserProfile = async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  res.status(200).json(req.user);
  if (!token) return res.status(400).json({ message: 'No token provided' });
 

}


module.exports.logoutUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }
  const blacklistToken = await blacklistTokenModel.create({ token });
  console.log(blacklistToken);



  // ✅ Clear cookie **before sending response**
  res.clearCookie('token');

  // ✅ Send final response
  return res.status(200).json({ message: 'Logged out successfully' });
};
