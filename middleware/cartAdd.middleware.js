const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

const cartAdd = (req, res, next) => {
    const userId = req.user.userId;
    const productId = req.query.productId;
    const count = parseInt(req.query.count) || 1;

    if (!productId || count <= 0) {
        return res.status(400).send({ error: "Bad request: Missing or invalid product ID or count." });
    }

    // Find the user's cart
    Cart.findOne({ user_id: userId })
        .then((cart) => {
            if (!cart) {
                return res.status(404).send({ error: "Cart not found for this user." });
            }

            // Find the product by ID
            Product.findOne({ _id: productId })
                .then((product) => {
                    if (!product) {
                        return res.status(404).send({ error: "Product not found." });
                    }

                    // Add or update the item in the cart
                    const existingItem = cart.items.find((item) => item.itemId === productId);
                    if (existingItem) {
                        existingItem.count = count; // Update count if item already exists
                    } else {
                        cart.items.push({
                            name: product.name,
                            itemId: product._id,
                            count: count,
                        });
                    }

                    req.cart = cart;
                    next();
                })
                .catch((productError) => {
                    console.error("Error finding product:", productError);
                    return res.status(500).send({ error: "Error finding product." });
                });
        })
        .catch((cartError) => {
            console.error("Error finding cart:", cartError);
            return res.status(500).send({ error: "Error finding cart." });
        });
};

module.exports = cartAdd;
