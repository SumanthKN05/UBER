const captainModel =require('../models/captain.model.js');
const captainService=require('../services/captain.service.js');
const {validationResult}=require('express-validator');


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