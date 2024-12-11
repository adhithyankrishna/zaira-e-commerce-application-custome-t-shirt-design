const mongoose = require("mongoose");

const getProductMiddleware = (req, res, next) => {
    const id = req.query.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID" });
    }
    next();
};

module.exports = getProductMiddleware;
