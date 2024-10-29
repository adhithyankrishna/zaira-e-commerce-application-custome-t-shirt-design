// verifyData.js (middleware)
const { body, validationResult } = require("express-validator");

const validateUser = [
    // Validate that 'name' is not empty
    body("name").notEmpty().withMessage("Name is required"),

    // Validate that 'email' is a valid email address
    body("email").isEmail().withMessage("Email is invalid"),

    // Validate that 'phone' is at least 10 digits long
    body("phone").isLength({ min: 10 }).withMessage("Phone Number should have 10 digits"),

    // Validate that 'password' is at least 6 characters long
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
];

const validateLoginData = [

    body("email").isEmail().withMessage("Email is invalid"),

    body("password").isLength({min:6}).withMessage("Password must at least 6 characters logn"),

    (req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({error:errors.array()});
        }
        
        next();
    }
]

// Ensure you're exporting the middleware correctly
module.exports = {validateUser,validateLoginData};
