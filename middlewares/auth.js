const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (req, res, next) => {
  token = req.headers.authorization.split(" ")[1];
  
  console.log(token)
  if (token != "undefined") {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, authData) => {
      console.log(authData)
      if (err) {
        res.status(401).json({ message: "You don't have access to perform this action" });
      } else {
        const user = await User.findOne({ email: authData.email });
        if (user.rol == "Admin") {
          next();
        } else {
          res.status(401).json({ message: "You don't have access to perform this action" });
        }
      }
    });
  } else {
    res.status(401).json({ message: "Forbidden" });
  }
};

module.exports = auth;
