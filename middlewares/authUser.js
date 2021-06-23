const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, authData) => {
      console.log(authData);
      if (err) {
        res.status(401).json({ message: "You are not logged in" });
      } else {
        res.json(authData);
      }
    });
  } catch (err) {
    console.log("error");
  }
};
module.exports = authUser;
