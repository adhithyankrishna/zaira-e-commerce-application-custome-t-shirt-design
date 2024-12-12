const Cart = require("../model/cart.model");


const addCart = (req,res,next)=>{
    const cart = req.cart;

    if (!cart){
        return res.status(400).send({error:"Invalid request"});
    }

    const newCart = new Cart(cart);

    newCart.save()
    .then((saved)=>{
        return res.status(201).send({msg:"New Cart is Saved",cart:saved});
    }).catch((error)=>{
        return  res.status(500).send({error:"Internal Server error"});
    })
    

}


module.exports = addCart;