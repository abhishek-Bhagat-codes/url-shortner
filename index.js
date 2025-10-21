const express = require("express");
const router = require("./routers/url.js");
const app = express();
const fs = require("fs");
const mongoose = require("./db.js");  
const URL = require("./models/URL.models.js")
const userRouter = require("./routers/user.routes.js");
const path = require("path");
const cookieParser = require('cookie-parser');
const { checkIsLoginOrNot } = require("./middleware/auth.js");
const userModel = require("./models/user.model.js")
require('dotenv').config();

//server utlitys 
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Your server is runing on Port :", PORT);
});

//log each request 
app.use((req,res,next)=>{const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFile("log.txt",log,(err)=>{if(err){console.log("somthing is wrong while writing our log :< ")}})
  next();
})

//header labling 
app.use((req, res, next) => {
  res.header({"X-Mode-by": "Abhishek Bhagat"});
  next();
});

//Routes
app.use("/url",checkIsLoginOrNot,router);
app.use("/user",userRouter);


// main landing page 
app.get("/", checkIsLoginOrNot, async (req, res) => {
  const user_id = req.user._id; // fixed destructuring
  if (!user_id) return res.redirect("/user/login");

  try {
    const user = await userModel.findOne({ _id: user_id });
    if (!user) {
      throw new Error("User not found!");
    }

    const Urls = await URL.find({ author: user._id });
    if (Urls.length === 0) {
      throw new Error("Nothing To show :(");
    }

    res.render("index", { shortedId: null, Urls: Urls });
  } catch (err) {
    console.error(err);
    res.render("index", { shortedId: null, Urls: null });
  }
});



