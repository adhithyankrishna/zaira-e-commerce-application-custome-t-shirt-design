const Joi = require('joi');

const sizeSchema = Joi.object({
    size: Joi.string().valid("s","l","m","xl","xxl","xxxl").required().messages({
        'any.one':"sixe must be valid one ",
        'string.empty': 'Size is required.'
    }),
    stock: Joi.number().integer().min(0).required().messages({
        'number.base': 'Stock must be a valid number.',
        'number.min': 'Stock cannot be negative.'
    })
});

const productValidationSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'Product name is required.',
        'string.min': 'Product name must be at least 3 characters long.',
        'string.max': 'Product name cannot exceed 100 characters.'
    }),
    description: Joi.string().min(10).max(1000).required().messages({
        'string.empty': 'Product description is required.',
        'string.min': 'Description must be at least 10 characters long.',
        'string.max': 'Description cannot exceed 1000 characters.'
    }),
    sex: Joi.string().valid('Male', 'Female', 'Unisex').required().messages({
        'any.only': 'Sex must be either Male, Female, or Unisex.'
    }),
    material: Joi.string().required().messages({
        'string.empty': 'Material type is required.'
    }),
    color: Joi.string().required().messages({
        'string.empty': 'Color is required.'
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Price must be a valid number.',
        'number.min': 'Price cannot be negative.'
    }),
    size: Joi.array().items(sizeSchema).min(1).required().messages({
        'array.min': 'At least one size option is required.'
    }),
    imageUrl: Joi.array().items(Joi.string().uri().required()).min(1).required().messages({
        'array.min': 'At least one image URL is required.',
        'string.uri': 'Image URL must be a valid URI.'
    }),
    createdAt: Joi.date().default(Date.now)
});


const validateProduct = async (req,res,next)=>{
    try{
        await productValidationSchema.validateAsync(req,body,{
            abortEarly:false
        })
    }
    catch(error){
        return res.status(400).send({
            error:"Validation failed",
            details : error.details.map((detail)=>(
                {
                    field:detail.path.join("."),
                    message:detail.message
                }
            ))
        })
    }
}



module.exports = validateProduct;