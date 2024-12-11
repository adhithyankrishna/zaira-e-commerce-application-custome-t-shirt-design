// services/sendImage.js
const cloudinary = require('../config/cloudinary');

const sendImage = (fileBuffer) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Convert file buffer to base64 string
            const base64File = fileBuffer.toString('base64');
            const file = `data:image/png;base64,${base64File}`;

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(file, {
                resource_type: 'auto',
                folder: 'e-commerce-products',
                transformation: [
                    { quality: 'auto:good' },
                    { fetch_format: 'auto' },
                    { width: 800, crop: 'limit' }
                ],
                allowed_formats: ['jpg', 'png', 'webp']
            });
     
            // Resolve with URL and public ID
           
            resolve({
                url: result.secure_url,
                public_id: result.public_id
            });
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
        }
    });
};

module.exports = sendImage;
