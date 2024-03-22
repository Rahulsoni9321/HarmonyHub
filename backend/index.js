const dotenv = require('dotenv')
require("dotenv").config();
const userroute = require("./route/user");
const bodyParser = require("body-parser");
const express=require("express")
const messageroute = require("./route/sendmessage");
// const {app,server}=require("./socket")
const { DatabaseConnection } = require("./db/user");
const cors=require("cors")
const app=express();
//Allowing the request made by the frontend

//Socket.io part





//To parse all the data that has been imported through router
app.use(cors())
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use("/api/v1", userroute);
app.use("/api/v1", messageroute);



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on ${process.env.PORT}`);
  DatabaseConnection()
});
