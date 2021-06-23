const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  try {
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (match) {
      const accessToken = jwt.sign({ email: email }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
      console.log(accessToken);
      res.json({
        status: 200,
        message: "User authenticated",
        jwt: accessToken,
        user,
      });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch {
    res.status(404).json({ message: "User does not exit or password incorrect" });
  }
};

module.exports = login;
