const mongoose = require("mongoose");

const Conversationschema= mongoose.Schema({
    participants: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
}],
   
messages:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Message',
    default:[]
}]
},{timestamps:true})

 const Conversation=mongoose.model("Conversation",Conversationschema)

 module.exports={
    Conversation
 }
