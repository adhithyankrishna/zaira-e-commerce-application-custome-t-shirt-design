const Joi = require('joi');


const validateimg = Joi.object({
    imageUrl: Joi.array().items(Joi.string().uri().required()).min(1).required().messages({
        'array.min': 'At least one image URL is required.',
        'string.uri': 'Image URL must be a valid URI.'
    }),

}).unknown(true);

const imageValidation  = async (req,res,next)=>{
   

    try{

        await validateimg.validateAsync(req.body,{ abortEarly: false });
        next();

    }
    catch(error){
        console.error('Validation error:', error);

        return res.status(400).json({
            error: "Validation failed",
            details: error.details.map(detail => detail.message)
        });

    }



}


module.exports = imageValidation;