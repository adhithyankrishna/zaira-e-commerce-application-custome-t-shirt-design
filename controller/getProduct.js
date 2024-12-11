const Product = require("../model/product.model");

const getProduct = async (req, res) => {
    const { id } = req.query;  // Extract 'id' from query parameters

    if (!id) {
        return res.status(400).send({ error: "Product ID is required" });
    }

    try {
    
        const product = await Product.findById(id);

        if (product) {
            return res.status(200).send(product);
        } else {
            return res.status(404).send({ error: "Product not found" });
        }
    } catch (error) {
        console.error("Error retrieving product:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
};

module.exports = getProduct;
