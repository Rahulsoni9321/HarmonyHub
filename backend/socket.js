const { Server } = require("socket.io");
const http = require("http");
const express = require("express")
const app = express();
const server = http.Server(app);
const io = new Server(server,{
  cors:{
    origin:"*"
  }
})

const Useronline = {};

 const getreceiverSocketid = (receiverid) => {
  return Useronline[receiverid];
}

module.exports={
    app,Useronline,getreceiverSocketid,io,server
}