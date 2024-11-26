const dotenv = require('dotenv')
require("dotenv").config();
const userroute = require("./route/user");
const bodyParser = require("body-parser");
const messageroute = require("./route/sendmessage");
const { DatabaseConnection } = require("./db/user");

const cors = require("cors");
const { Useronline, io, app, server } = require('./socket');

app.use(cors())
app.use(bodyParser.json());



io.on("connection", (socket) => {
  const userid = socket.handshake.query.userid;

  if (userid !== 'undefined') {

    Useronline[userid] = socket.id;

  }


  io.emit('onlineusers', Object.keys(Useronline));
  socket.emit("welcome", `welcome to the server users`);




  socket.on("disconnect", (c) => {
    delete Useronline[userid]
    io.emit("onlineusers", Object.keys(Useronline))

  });
});




app.use("/api/v1", userroute);
app.use("/api/v1", messageroute);



server.listen(process.env.PORT, () => {
  console.log(`Example app listening on ${process.env.PORT}`);
  DatabaseConnection()
});
