const userModel = require('../models/user.model.js');
const captainModel = require('../models/captain.model.js');
const bcrypt = require('bcrypt');
const { request } = require('express');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model'); // Import the blacklist model


//TODO: this middleware is used to authenticate the user logged in by checking the token  in the cookies  or in the headers


module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the token is blacklisted
  const isBlackListed = await BlacklistToken.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorised" });
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




module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token; // Only check cookies for the token
  console.log("Cookies in Request:", req.cookies);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await BlacklistToken.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: "User not found" });
    }

    req.captain = captain;
    return next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};