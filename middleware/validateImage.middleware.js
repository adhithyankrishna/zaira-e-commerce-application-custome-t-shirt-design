const validateImageType = require("validate-image-type");

const validateImage =async  (req,res,next)=>{
    try{
        const validationResult = await validateImageType(
            req.file.buffer,
            {
                allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
                maxSize: 5 * 1024 * 1024, // 5MB
            }
        )


        if (!validationResult){
            return res.status(400).send(
                {
                    error: 'Invalid image file',
                    details: validationResult.error
                }
            )
        }

        next();
    }
    catch (error) {
        console.error('Image validation error:', error);
        res.status(500).json({ error: 'Error validating image' });
    }
}


module.exports  =  validateImage;