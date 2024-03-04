require("dotenv").config();
const express = require("express");
const userroute = require("./route/user");
const messageroute = require("./route/sendmessage");

const bodyParser = require("body-parser");
const {app,server}=require("./socket")
const { DatabaseConnection } = require("./db/user");


//Allowing the request made by the frontend


//Socket.io part




//To parse all the data that has been imported through router
app.use(bodyParser.json());

app.use("/api/v1", userroute);
app.use("/api/v1", messageroute);



server.listen(process.env.PORT, () => {
  console.log(`Example app listening on ${process.env.PORT}`);
  DatabaseConnection()
});
