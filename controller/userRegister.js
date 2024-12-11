const User = require("../model/user.models");

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
                res.status(201).send({msg:"User is Registered",user:userdata});
            }
        })
      }else{
        res.status(400).send({msg:"User already found"});
      }
   })


   
}

module.exports = userRegister;