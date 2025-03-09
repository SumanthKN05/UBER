const captainModel=require('../models/captain.model');


module.exports.createCaptain = async ({ firstname, lastname, email, password, color, plate, capacity, typeVehicle }) => {
  if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !typeVehicle) {
    throw new Error('All fields are required');
  }

  const captain = await captainModel.create({
    fullname: { firstname, lastname },
    email,
    password,
    vehicle: { color, plate, capacity, typeVehicle }
  });

  return captain;
};
