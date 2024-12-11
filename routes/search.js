const express = require("express");
const search = express.Router();
const userSearch = require("../controller/userSearch");
const searchm = require("../middleware/search.middleware");



search.get('/search',searchm,userSearch,(req,res)=>{
    return res.status(501).send("error");
       
})

module.exports =search;