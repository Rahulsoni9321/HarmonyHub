const mongoose = require("mongoose");
require("dotenv").config();

const DatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to Database");
  } catch (e) {
    console.log(e.message, " Error connecting to Mongodb_url");
  }
};

const userschema = mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  gender: String,
  password: String,
  profilepic: {
    type: String,
    default: "",
  }
},
{timestamps: true},);

const User = mongoose.model("User", userschema);

module.exports = {
  User,
  DatabaseConnection,
};
