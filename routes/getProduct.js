const express =  require("express");
const getSingleProduct = require("../controller/getSingleProduct");
const getProductMiddleware = require("../middleware/getProduct.middleware");

const getProduct = express.Router();


getProduct.get("/getProduct",getProductMiddleware,getSingleProduct,(req,res)=>{
    return res.status(500).send({error:"Server Error"});

})


module.exports = getProduct;

