const Product = require("../model/product.model");

const getSingleProduct = (req, res, next) => {
    const id = req.query.id;

    Product.findOne({ _id: id })
        .then((data) => {
            if (data) {
                return res.status(200).send(data);
            } else {
                return res.status(404).send({ error: "Product not found" });
            }
        })
        .catch((error) => {
            next(error); // Pass the error to the error handler
        });
};

module.exports = getSingleProduct;
