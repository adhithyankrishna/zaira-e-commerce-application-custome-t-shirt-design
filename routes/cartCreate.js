const express = require("express");
const  createCart = require("../service/createCart.Service");
const User = require("../model/user.models");
const authGurd = require("../middleware/authGurd.middleware");
const adminGurd = require("../middleware/adminGurd.middlewarre");


const cart = express.Router();



cart.get("/createCart",authGurd,adminGurd,(req,res)=>{
    try{

    const email = req.query.email;

    User.findOne({email}).then((data)=>{
        if (!data|| data.length === 0){
            console.log("Not valid email");
            return res.status(400).send({error:"Not valid email"});
        }

        createCart(data.id).then((data)=>{
            return res.status(201).send({msg:"Cart created sucess"});
        }).catch((error)=>{
            return res.status(400).send({error});
        })
        
    }).catch((Error)=>{
        console.log(Error);
        return  res.status(500).send({Error:"Server Error"});
    })

    }catch(error){
        return res.status(500).send({error:"Server error"});
    }
})


module.exports = cart;