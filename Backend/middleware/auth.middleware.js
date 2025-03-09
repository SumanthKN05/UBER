const userModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const { request } = require('express');
const jwt = require('jsonwebtoken');


//TODO: this middleware is used to authenticate the user logged in by checking the token  in the cookies  or in the headers
const BlacklistToken = require('../models/blacklistToken.model'); // Import the blacklist model

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the token is blacklisted
  const isBlackListed = await BlacklistToken.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Attach user to the request object
    return next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

