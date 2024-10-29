const jwt = require("jsonwebtoken");

const authGurd = (req, res, next) => {
   const token = getTokenFromHeader(req);  
   
   if (!token) {
        return res.status(401).send({ error: "Access Denied: No Token Provided" });
   }

   try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);  
      
      if (decode) {
        req.user = decode;  
        next();  
      } else {
        return res.status(401).send({ error: "Invalid Token" });
      }
   } catch (error) {
      
      if (error.name === "TokenExpiredError") {
         return res.status(401).send({ error: "Token Expired" });
      }
      return res.status(500).send({ error: "Server Error: Invalid Token" });
   }
}

const getTokenFromHeader = (req) => {
   
    const authHeader = req.headers?.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(' ')[1];  
    }
    return null;  
}

module.exports = authGurd;
