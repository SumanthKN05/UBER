const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainSchema =  new mongoose.Schema({
    fullname:{
      firstname:{
        type: String,
        required: true,
        minlength: [3, 'Too short,have atleast 3 characters'],
        maxlength: 50
      },
      lastname:{
        type: String,
        minlength: [3, 'Too short,have atleast 3 characters'],
        maxlength: 50
      }
    },
    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password:{
      type: String,
      required: true,
      minlength: 8
    },
    socektId:{ type: String },

  status:{
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  vehicle:{
    color:{
      type: String,
      required: true
    },
    plate:{
      type: String,
      required: true
    },
    capacity:{
      type: Number,
      required: true,
      minlength: [1, 'Should have atleast 1 capacity'],
    },
    typeVehicle:{
      type: String,
      enum: ['auto', 'car', 'moterCycle'],
      required: true
    }
  },
  location:{
     lat:Number,
     lng:Number,
      
  },
 
});
captainSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id}, process.env.JWT_PRIVATE_KEY);
  return token;
}
captainSchema.methods.comparePassword = function(password){
  return bcrypt.compare(password, this.password);
}
captainSchema.statics.hashPassword = async function(password){
 return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('Captain', captainSchema);
module.exports = captainModel;