const cloudinary = require('cloudinary').v2;


const cloud = cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_NAME, 
    api_secret: process.env.CLOUDINARY_CLOUD_NAME 
});


module.exports = cloud;