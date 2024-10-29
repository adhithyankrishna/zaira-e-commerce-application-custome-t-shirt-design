const express = require("express");
const user = express.Router();
const {validateUser,validateLoginData} = require("../middleware/verifyData");
const User = require("../model/user.models");
const  userRegister  = require("../controller/userRegister");
const  userLogin = require("../controller/userLogin");

user.post("/register", validateUser,userRegister,  (req, res) => {});

user.get("/login",validateLoginData,userLogin,(req,res)=>{
   
    res.send("hai");
});

module.exports = user;
