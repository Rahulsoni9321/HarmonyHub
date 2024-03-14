const express = require("express");
require("dotenv").config();
const { signupschema, signinschema } = require("../zod/user");
const { User } = require("../db/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const http = require("http");
const app = express();
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const bcrypt = require("bcryptjs");
const { usermiddleware } = require("../middleware/user");


router.post("/signup", async (req, res) => {
  const userpayload = req.body;
  const parseuserpayload = signupschema.safeParse(userpayload); //Parsing the data and validating the format of the data in the body
  try {
    if (parseuserpayload.success) {
      const finding_user_email = await User.findOne({
        //Checking if the email is already in used or not
        email: userpayload.email,
      });

      if (finding_user_email) {
        return res.status(500).json({
          message: "Email already exists.",
        });
      }

      const salt = await bcrypt.genSalt(5);
      const hashedpassword = await bcrypt.hash(userpayload.password, salt);

      const maledp = `https://avatar.iran.liara.run/public/boy?username=${userpayload.firstname}`;

      const femaledp = `https://avatar.iran.liara.run/public/girl?username=${userpayload.firstname}`;

      const newuser = await User.create({
        //User creating function
        email: userpayload.email,
        firstname: userpayload.firstname,
        lastname: userpayload.lastname,
        gender: userpayload.gender,
        password: hashedpassword,
        profilepic: userpayload.gender == "Male" ? maledp : femaledp,
      });

      const token = jwt.sign(
        //Assigning the jwt token to the verified user
        { userid: newuser._id },
        process.env.JWT_KEY
      );
      res.cookie("token", token);
      res.json({
        token: token,
        message: "User created successfully.",
        user:newuser
      });
    } else {
      res.status(500).json({
        message: "Invalid input. " + parseuserpayload.error.errors[0].message, //to give specific information about the error.
      });
    }
  } catch (e) {
    res.status(401).json({
      message: "Internal Server error. Please try again later. " + e,
    });
  }
});

router.post("/signin", async (req, res) => {
  const userpayload = req.body;
  const parseuserpayload = signinschema.safeParse(userpayload); //Parsing the data and validating the format of the data in the body
  try {
    if (parseuserpayload.success) {
      const findinguser = await User.findOne({
        email: userpayload.email,
      }).exec();

      if (findinguser) {
        const checkpassword = await bcrypt.compare(userpayload.password,findinguser.password);
        if (checkpassword) {
          const token = jwt.sign(
            { userid: findinguser._id },
            process.env.JWT_KEY
          );
          res.cookie("token", token);

         return res.json({
            token: token,
            message: "Signed in successfully",
            user:findinguser
          });
        } else {
          return res.json({
            message: "Invalid credentials. Please try again.",
          });
        }
      } else {
        return res.status(400).json({
          message: "User does not exist",
        });
      }
    } else {
      return res.status(500).json({
        message: "Invalid input. " + parseuserpayload.error.errors[0].message,
      });
    }
  } catch (e) {
    res.status(401).json({
      message: "Something went wrong, Please try again later.",
      details: e,
    });
  }
});

router.get("/userprofile", usermiddleware, async (req, res) => {
  const id = req.userid;
  console.log(id);
 try 
 { 
  const user = await User.findOne({
    _id: id,
  });
  res.json({
    user: user,
  });}
  catch(error){
    console.log("this isthe error in the route",error)
    return res.json({
      message:"Something went wrong while fetching user details. Please try again.",
      details:error
    })
  }
});

router.get("/allusers", usermiddleware, async (req, res) => {
  const name = req.query.name || "";
  const getuser = req.userid;
  try {
    const allusers = await User.find({
      $or: [
        {
          firstname: {
            $regex: name,
          },
        },
        {
          lastname: {
            $regex: name,
          },
        },
      ],
    }).select("-password");

    res.json({
      user: allusers,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/receiveruser", usermiddleware, async (req, res) => {
  const id = req.query.id;
  const user = await User.findOne({
    _id: id,
  });
  
  res.json({
    receiveruser: user,
  });
});

module.exports = router;
