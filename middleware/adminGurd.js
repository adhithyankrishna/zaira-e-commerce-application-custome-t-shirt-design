const jwt = require("jsonwebtoken");

const adminGurd = (req, res, next) => {
    try{
        const user  = req.user;
       
        if (user.role === "admin"){
            next();
            return;
        }
        res.status(401).send({error:"Acess Denied"});
        return;

    }

   catch(error){
    res.status(500).send({error:"Server Error"});
   }
}


module.exports = adminGurd;
