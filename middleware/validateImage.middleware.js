const { validateBufferMIMEType } = require("validate-image-type");

const validateImage = async (req, res, next) => {
    try {
        // Check if a file is provided
     
        if (!req.files || req.files.length==0) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Define the options as required by validateBufferMIMEType
        const options = {
            allowMimeTypes: ['image/jpeg', 'image/png', 'image/webp'], // Explicitly setting MIME types as an array
            maxFileSize: 5 * 1024 * 1024 // 5MB
        };

        // Perform validation on the file buffer

        for (const file of req.files) {
            
            const validationResult = await validateBufferMIMEType(file.buffer, options);

            // Check validation result
            if (!validationResult.ok) {
                return res.status(400).json({
                    error: 'Invalid image file',
                    details: validationResult.error
                });
            }
        }

        // Proceed to the next middleware if validation passes
        next();
    } catch (error) {
        console.error('Image validation error:', error);
        res.status(500).json({ error: 'Error validating image' });
    }
};

module.exports = validateImage;
