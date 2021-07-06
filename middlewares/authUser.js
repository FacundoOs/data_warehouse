const jwt = require("jsonwebtoken");

const authUser =  async(req, res, next) => {
  console.log(req.headers.authorization);
  try {
    token = req.headers.authorization.split(" ")[1];
    await jwt.verify(token, process.env.TOKEN_SECRET, async (err, authData) => {
      console.log(authData);
      if (err) {
        res.status(401).json({ message: "You are not logged in" });
      } else {
        res.json(authData);
      }
    });
  } catch (err) {
    res.status(404).json({ message: "Not authorized" });
  }
};
module.exports = authUser;
