const User = require("../model/user.models");
const createCart  = require("../service/createCart.Service");

const userRegister = (req,res)=>{
    const {name,email,phone,password,role} = req.body;
    
    const userdata = {
        name,
        phone,
        password,
        email
    };

    if (role){
      userdata["role"]  = role;
    }

   User.findOne({email}).then((data)=>{
      if(!data || data.length==0){
        const newUser = new User(userdata);
        
        newUser.save().then((data)=>{
            if (data){
                createCart(data.id).then((Data)=>{
                   return res.status(201).send({msg:"User and  cart is created sucessufully",user:data});
                }).catch(error=>{
                  return res.status(201).send({msg:"User is created but cart is not created contact admin to do create",user:data,error})
                })
            }
            
        })
      }else{
        res.status(400).send({msg:"User already found"});
      }
   })


   
}

module.exports = userRegister;