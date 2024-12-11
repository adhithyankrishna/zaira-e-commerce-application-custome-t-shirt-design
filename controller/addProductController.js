const Product = require("../model/product.model");

const addProductController = async (req, res) => {
 

    const productObj = req.body;
   
    try {
        
        const existingProduct = await Product.findOne({
            name: productObj.name,
            brand: productObj.brand,
            category: productObj.category,
            price: productObj.price
        });

        if (existingProduct) {
            return res.status(400).send({ error: "Product with the same name, brand, category, and price already exists" });
        }

        // If no existing product is found, create a new product
        const newProduct = new Product(productObj);
        await newProduct.save();

        return res.status(201).send({ msg: "Product saved successfully" });
    } catch (error) {
        return res.status(400).send({ error: "Server error" });
    }
};

module.exports = addProductController;
