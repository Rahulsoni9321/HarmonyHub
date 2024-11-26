require("dotenv").config();
const jwt = require("jsonwebtoken");

function usermiddleware(req,res,next){
    const token = req.headers.authorization;
    const jwttoken=token.split(" ")[1];
    try{
     const verification=jwt.verify(jwttoken,process.env.JWT_KEY);
     if (verification){
        req.userid=verification.userid;
                
        next();
     }
     else {
        console.log("here the error.")
        res.json(500).json({
            message:"You are not authorized."
        })
     }
    }
    catch(e){
        console.log("this is the error",error)
        res.status(400).json({
            message:"Something went wrong.",
            details:e.message
        })
    }
}


module.exports={
    usermiddleware
}