const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [5, "First Name must at least have 5 characters"],
      maxlength: 30,
    },
    lastname: {
      type: String,
      minlength: [5, "Last Name must at least have 2 characters"],
      maxlength: 30,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

// METHODS

// todo: generating the tokens
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{ expiresIn: '24h' });
  return token;
};

// todo: comparing the password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


// todo: creating static method for hashing Password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

//todo:Static method to find user by email// Add this inside userSchema before creating the model
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};


// todo: creating user model
const userModel = mongoose.model('user', userSchema);

// todo export model
module.exports = userModel;
