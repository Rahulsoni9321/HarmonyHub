const express = require("express");
const { usermiddleware } = require("../middleware/user");
const { Conversation } = require("../db/conversation");
const { Message } = require("../db/message");
const { getreceiverSocketid, io } = require("../socket");
const router = express.Router();

router.post("/send/:userid", usermiddleware, async (req, res) => {
  try {
    const id = req.params.userid;
    const senderid = req.userid;
    const SentMessage = req.body;
    let newconversation = await Conversation.findOne({
      participants: { $all: [senderid, id] },
    });
    if (!newconversation) {
      newconversation = await Conversation.create({
        participants: [senderid, id],
      });
    }
    const newmessages = await Message.create({
      senderId: senderid,
      receiverId: id,
      messages: SentMessage.messages,
    });
    if (newmessages) {
      newconversation.messages.push(newmessages._id);
    }
    await newconversation.save();
    
    const ReceiverSocketid=getreceiverSocketid(id);
    if (ReceiverSocketid){  
      
      io.to(ReceiverSocketid).emit("newmessages",newmessages)
    }

    res.status(200).json({newmessage:newmessages});
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong, please try again.",
      message: error.message,
    });
  }
});
router.get("/send/:userid", usermiddleware, async (req, res) => {
  try {
    const id = req.params.userid;
    const senderid = req.userid;

    const findconversation = await Conversation.findOne({
      participants: { $all: [senderid, id] },
    }).populate("messages");
    if (!findconversation) {
      return res.status(200).json([]);
    }
    const messages = findconversation.messages;
    return res.json({
      allmessages:messages
    });
  } catch (error) {
    console.log("error in getting messages.", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;
