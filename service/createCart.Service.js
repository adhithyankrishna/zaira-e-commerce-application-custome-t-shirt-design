const  Cart = require("../model/cart.model");


const createCart  =(userId) =>{
    return new Promise((resolve,reject)=>{
        if (!userId){
            reject("There is user id is provided");
        }

        const cart = {
            user_id : userId
        }

        Cart.findOne({ user_id:userId}).then((data)=>{
            if (!data|| data.length == 0){
                const newCart = new Cart(cart);

                newCart.save().then((data)=>{
                    resolve(data);
                })
            }
            else{
                reject("there is already cart is present");
            }
        })
    })
}


module.exports = createCart;