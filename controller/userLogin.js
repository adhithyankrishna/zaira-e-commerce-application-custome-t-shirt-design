const User = require("../model/user.models");
const jwt = require("jsonwebtoken");


const userLogin = async (req, res) => {

  try {
    //console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).send({ error: "user not found" });

    const isMatch = await user.comparePassword(password);


    if (!isMatch) {
      return res.status(401).send({ error: "Invalid credentials" });
    } else {
       
      const token = jwt.sign({ 'userId': user._id, "role": user.role }, process.env.JWT_SECRET, { expiresIn: '6h' });

      req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role,
        token: token,
        lastSearch: ''
      };

      return res.status(200).json({ message: 'Login successful', token });
    }
  }
  catch (Error) {
    return res.status(500).send({ "error": "Server error" });
  }


}


module.exports = userLogin;