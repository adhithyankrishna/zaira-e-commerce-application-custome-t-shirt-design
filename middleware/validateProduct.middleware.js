const Joi = require('joi');

const descriptionSchema = Joi.object({
    key: Joi.string().required().messages({
        'string.empty': 'Description key is required.'
    }),
    value: Joi.string().required().messages({
        'string.empty': 'Description value is required.'
    })
});

const optionSchema = Joi.object({
    optionName: Joi.string().required().messages({
        'string.empty': 'Option name is required.'
    }),
    optionValue: Joi.string().required().messages({
        'string.empty': 'Option value is required.'
    })
});

const productValidationSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'Product name is required.',
        'string.min': 'Product name must be at least 3 characters long.',
        
    }),
    about: Joi.array().items(Joi.string().required()).min(1).required().messages({
        'array.min': 'At least one "about" point is required.',
        'string.empty': '"About" points must be strings.'
    }),
    description: Joi.array().items(descriptionSchema).min(1).required().messages({
        'array.min': 'At least one description entry is required.'
    }),
    brand: Joi.string().required().messages({
        'string.empty': 'Brand is required.'
    }),
    category: Joi.string().required().messages({
        'string.empty': 'Category is required.'
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Price must be a valid number.',
        'number.min': 'Price cannot be negative.'
    }),
    dimensions: Joi.string().required().messages({
        'string.empty': 'Dimensions are required.'
    }),
    options: Joi.array().items(optionSchema).messages({
        'array.base': 'Options must be an array of objects.'
    }),
    stock: Joi.number().integer().min(0).required().messages({
        'number.base': 'Stock must be a valid number.',
        'number.min': 'Stock cannot be negative.'
    }),
   
    avgRating: Joi.number().min(0).max(5).default(0).messages({
        'number.min': 'Average rating cannot be less than 0.',
        'number.max': 'Average rating cannot exceed 5.'
    }),
    totalRatings: Joi.number().integer().min(0).default(0).messages({
        'number.base': 'Total ratings must be a valid number.',
        'number.min': 'Total ratings cannot be negative.'
    }),
    totalPurchased: Joi.number().integer().min(0).default(0).messages({
        'number.base': 'Total purchased count must be a valid number.',
        'number.min': 'Total purchased count cannot be negative.'
    }),
    createdAt: Joi.date().default(Date.now)
});

const validateProduct = async (req, res, next) => {
    try {
        // If `description` or `options` are strings, try to parse as JSON
        req.body = JSON.parse(JSON.stringify(req.body));

        

        try {
            if (typeof req.body.description === 'string'  || typeof req.body.description === 'object') {
                
                req.body.description = JSON.parse(req.body.description);
                
                
                
            }
        } catch (parseError) {
            return res.status(400).json({
                error: "Validation failed",
                details: ["Invalid JSON format for description"]
            });
        }
        
        if (typeof req.body.options === 'string') {
            req.body.options = JSON.parse(req.body.options);
        }

        // Validate request body against schema
        await productValidationSchema.validateAsync(req.body);
        
        next(); // Proceed if validation succeeds
    } catch (error) {
       

        return res.status(400).json({
            error: "Validation failed",
            details: error.details.map(detail => detail.message)
        });
    }
};

module.exports = validateProduct;
