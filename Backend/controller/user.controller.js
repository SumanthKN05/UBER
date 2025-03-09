const userModel = require('../models/user.model.js');
const userServices = require('../services/user.service.js');
const { validationResult } = require('express-validator');

// Authentication

module.exports.registerUser = async (req, res, next) => {
  // checking the error from the register user validation we did in the routes and sending response
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  const { fullname, email, password } = req.body;

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
  // checking the error from the login user validation we did in the routes and sending response
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  // todo: finding user in db using the user model in the models folder
  const user = await userModel.findByEmail(email).select('+password');

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  // todo: comparing hashed password with the entered password

  const isMatch = await user.comparePassword(password); // ✅ This should now work
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  
  const token = user.generateToken();
  res.status(200).json({ user, token });


}
