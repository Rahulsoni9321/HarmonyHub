const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const { User } = require("./db/user");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  



const Useronline={};

const getreceiverSocketid=(receiverid)=>{
  return Useronline[receiverid];
}

io.on("connection", (socket) => {
  const userid=socket.handshake.query.userid;

  if (userid!=='undefined'){

    Useronline[userid]=socket.id;
    console.log(Useronline)
  }

    console.log("user is now connected : ", socket.id);
    console.log(Object.keys(Useronline));
    io.emit('onlineusers',Object.keys(Useronline));
    socket.emit("welcome", `welcome to the server users`);
  
    
  
    
    socket.on("disconnect", (c) => {
      delete Useronline[userid]
      io.emit("onlineusers",Object.keys(Useronline))
      console.log(`User disconnected ${socket.id}`);
    });
  });

module.exports={
    app,server,getreceiverSocketid,io
}