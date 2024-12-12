const express = require("express");
const authGurd = require("../middleware/authGurd.middleware");
const cartAdd = require("../middleware/cartAdd.middleware");
const cartRoute =  express.Router();
const addCart = require("../controller/addCart");



cartRoute.post("/addCart",authGurd,cartAdd,addCart,(req,res)=>{
    console.log(req.cart);
    return res.status(500).send({Error:"Server error"});
})


module.exports =  cartRoute;