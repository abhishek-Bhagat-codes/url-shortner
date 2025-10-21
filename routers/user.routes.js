const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller.js")

userRouter.get("/signUp",userController.signUp);
userRouter.post("/signUp",userController.postSignUp);

userRouter.get("/login",userController.login);
userRouter.post("/login",userController.postLogin);

userRouter.get("/logout",userController.logOut);


module.exports = userRouter;