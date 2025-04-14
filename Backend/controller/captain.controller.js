const captainModel =require('../models/captain.model.js');
const captainService=require('../services/captain.service.js');
const {validationResult}=require('express-validator');
const  blacklistTokenModel= require('../models/blacklistToken.model.js');

//!SECTION: Captain Registration Login,getting Profile,Logout





//NOTE - The controller function is executed after the middleware.
module.exports.registerCaptain=async (req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {fullname,email,password,vehicle}=req.body;
  console.log(req.body)

  const isCaptainAlreadyExist= await captainModel.findOne({email});
  if(isCaptainAlreadyExist){
    return res.status(400).json({message:"Captain already exist"});
  }
  //TODO: hash the password before saving it to the database
  const hashedPssword= await captainModel.hashPassword(password);
  //TODO: create a new captain in the database using the captain service in the services folder
const captain= await captainService.createCaptain(
  {
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashedPssword,
    color:vehicle.color,
    plate:vehicle.plate,
    capacity:vehicle.capacity,
    typeVehicle:vehicle.typeVehicle,
  });

  const token=captain.generateAuthToken();
  res.status(201).json({captain, token})
}

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log(req.body);

  const captain = await captainModel.findOne({ email });
  if (!captain) {
    return res.status(404).json({ message: "Captain not found" });
  }

  const isPasswordValid = await captain.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = captain.generateAuthToken();

  // Set the token in a cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Prevents CSRF attacks
  });

  return res.status(200).json({
    message: "Captain logged in successfully",
    captain,
  });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  // No need to query the database again, use the captain object from the middleware
  if (!req.captain) {
    return res.status(404).json({ message: "Captain not found" });
  }
  // Send the captain's profile and token
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Add the token to the blacklist
    await blacklistTokenModel.create({ token });
    console.log("Token added to blacklist:", token);

    // Clear the token from cookies
    res.clearCookie('token');
    console.log("Cookie cleared.");

    res.status(200).json({ message: "Captain logged out successfully" });
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};