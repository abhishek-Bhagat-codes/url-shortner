const userModel = require("../models/user.model.js");
const { v4:uuidv4 } =  require('uuid');
const {addLoginUser,checkLoginUser,removeLoginUser} = require("../services/auth.js");
const bcrypt = require('bcrypt');

const SALT_LENGTH = process.env.SALT_LENGTH || 10;

//sign up page
exports.signUp = (req, res) => {
  res.render("signUp.ejs",{
    msg:null,errMsg:null
  });
};
//signUp logic
exports.postSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.render("signUp.ejs", {
        msg:null,errMsg:"all fields are required"
    });
  }
  try {
    hash_password = await bcrypt.hash(password,SALT_LENGTH);
    await userModel.create({
      username: username,
      email: email,
      password: hash_password,
    });
    return res.render("signUp.ejs", {
        msg:"sign Up done ! ",errMsg:null
    });
  } catch (err) {
    return res.render("signUp.ejs", {
        msg:null,errMsg:err.message
    });
  }
};

//login page
exports.login = (req, res) => {
  res.render("login.ejs",{msg:null,errMsg:null});
};

//login logic
exports.postLogin = async (req, res) => {
  const {email,password} = req.body;
  if(!email || !password){
    return res.render("login.ejs",{msg:null,errMsg:"all fields are required !"});
  }
  try{
    const user = await userModel.findOne({ email: email });
    if(!user) return res.render("login.ejs",{msg:null,errMsg:"user Not Found :( "});
    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.render("login.ejs",{msg:null,errMsg:"Invalid password"});
    const sessionId = uuidv4();
    if(sessionId){
      addLoginUser(sessionId,{
        email:user.email,
        username:user.username,
        _id:user._id
      })
      res.cookie("sessionId",sessionId);
      return res.redirect("/");
    }
  }
  catch(err){
    return res.render("login.ejs",{msg:null,errMsg:err.message});
  }
};

exports.logOut =(req,res)=>{
  const sessionId = req.cookies.sessionId;
  if(!sessionId) return res.redirect("/login");
  res.clearCookie("sessionId");
  removeLoginUser(sessionId);
  return res.redirect("/user/login");
}
