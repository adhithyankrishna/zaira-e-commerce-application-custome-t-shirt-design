const Product = require("../model/product.model");

const userSearch = async (req, res) => {    
    try {
        const limit = 20;
        const search = req.search;
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;

        let products = [];

        if (search.$text) {  // Check if text search is used
            products = await Product.find(search)
                .select('name price imageUrl avgRating')  // Select specific fields
                .sort({ score: { $meta: "textScore" } })  // Sort by relevance score
                .skip(skip)
                .limit(limit)
                .exec();
        } else {
            products = await Product.find(search)
                .select('name price imageUrl  avgRating')
                .skip(skip)
                .limit(limit)
                .exec();
        }

        // Transform products to include only the first image from imageUrl
        const formattedProducts = products.map(product => {
            return {
                _id: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl[0],  // Take the first image URL
                description: product.description,  // Optionally, limit description length
                avgRating: product.avgRating
            };
        });

        // Send the formatted response
        return res.status(200).send({ products: formattedProducts });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error" });
    }
};

module.exports = userSearch;
