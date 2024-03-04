const mongoose = require("mongoose");

const Messageschema= mongoose.Schema({
    senderId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
},
    receiverId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
},
messages:{
    type:String,
    required:true
}
},{timestamps:true})

 const Message=mongoose.model("Message",Messageschema)

 module.exports={
    Message
 }
