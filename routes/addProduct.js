const express = require("express");
const addProduct = express.Router();
const adminGurd = require("../middleware/adminGurd.middlewarre");
const authGurd = require("../middleware/authGurd.middleware");
const  addProductController  = require("../controller/addProductController");
const multer = require("multer");
const validateImage = require("../middleware/validateImage.middleware");
const validateProduct = require("../middleware/validateProduct.middleware");
const getUrl = require("../middleware/getImageUrl.middleware");
const imageValidation = require("../middleware/urlValidation.middleware");


const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});


addProduct.post('/addProduct',authGurd,adminGurd,upload.array("images",10),validateProduct,validateImage,getUrl,imageValidation,addProductController,(req,res)=>{
    res.status(500).send({error:"Server Error"});
});



module.exports = addProduct;