const dotenv = require('dotenv')
require("dotenv").config();
const userroute = require("./route/user");
const { Server } = require("socket.io");
const http = require("http");
const bodyParser = require("body-parser");
const express = require("express")
const messageroute = require("./route/sendmessage");
// const {app,server}=require("./socket")
const { DatabaseConnection } = require("./db/user");

const cors = require("cors")
const app = express();
const server = http.Server(app);
const io = new Server(server,{
  cors:{
    origin:"*"
  }
})

app.use(cors())
app.use(bodyParser.json());
//Allowing the request made by the frontend

//Socket.io part

const Useronline = {};

const getreceiverSocketid = (receiverid) => {
  return Useronline[receiverid];
}

io.on("connection", (socket) => {
  const userid = socket.handshake.query.userid;

  if (userid !== 'undefined') {

    Useronline[userid] = socket.id;
    console.log(Useronline)
  }

  console.log("user is now connected : ", socket.id);
  console.log(Object.keys(Useronline));
  io.emit('onlineusers', Object.keys(Useronline));
  socket.emit("welcome", `welcome to the server users`);




  socket.on("disconnect", (c) => {
    delete Useronline[userid]
    io.emit("onlineusers", Object.keys(Useronline))
    console.log(`User disconnected ${socket.id}`);
  });
});
//To parse all the data that has been imported through router




app.use("/api/v1", userroute);
app.use("/api/v1", messageroute);



server.listen(process.env.PORT, () => {
  console.log(`Example app listening on ${process.env.PORT}`);
  DatabaseConnection()
});
