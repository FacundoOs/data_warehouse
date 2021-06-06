const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  try {
    const match = await bcrypt.compare(password, user.password);
    const accessToken = jwt.sign({ email: email }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
    console.log(accessToken)
    if (match) {
      res.json({
        message: "User authenticated",
        jwt: accessToken,
      });
    }
  } catch {
    res.status(500).json({ message: "User does not exit or password incorrect" });
  }
};

module.exports = login;
