const dotenv = require('dotenv')
require("dotenv").config();
const userroute = require("./route/user");
const bodyParser = require("body-parser");
const messageroute = require("./route/sendmessage");
const {app,server}=require("./socket")
const { DatabaseConnection } = require("./db/user");
const cors=require("cors")

//Allowing the request made by the frontend

//Socket.io part





//To parse all the data that has been imported through router
app.use(cors())
app.use(bodyParser.json());

app.use("/api/v1/user", userroute);
app.use("/api/v1/", messageroute);



server.listen(process.env.PORT, () => {
  console.log(`Example app listening on ${process.env.PORT}`);
  DatabaseConnection()
});
