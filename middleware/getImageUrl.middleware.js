const sendImage = require("../service/sendImage.service");

const getUrl = async (req, res, next) => {
    try {
        // Ensure imageUrl is defined as an empty array
        const imageUrl = [];

    
        for (const file of req.files) {
            try {
               
              
                const imageDetail = await sendImage(file.buffer);
              
                if (!imageDetail.url) {
                    // Throw error if no URL is returnedconsole
                    throw new Error("Server error: Image upload failed");
                } else {
                    // Add URL to imageUrl array
                    imageUrl.push(imageDetail.url);
                }
            } catch (error) {
                // Catch individual image upload errors
                return res.status(500).send({ error: error.message || "Error processing image upload" });
            }
        }

        // Attach imageUrl array to req object
        req.body.imageUrl = imageUrl;

        // Call next middleware
        next();
    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).send({ error: error.message || "Unexpected server error" });
    }
};

module.exports = getUrl;
