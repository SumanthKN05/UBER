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
