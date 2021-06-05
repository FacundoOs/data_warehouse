const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, lastName, email, rol, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user == undefined) {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      lastName: lastName,
      email: email,
      rol: rol,
      password: hashPassword,
    });

    try {
      const savedUSer = await newUser.save();
      console.log(savedUSer);
      res.json({ message: "User created" });
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(500).json({ message: "Email already taken" });
  }
};

module.exports = register;



// {
//   "name": "Client",
//   "lastName": "Client",
//   "email": "client@mail.com",
//   "rol": "Client",
//   "password": "client123"
// }

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQWNjb3VudEBtYWlsLmNvbSIsImlhdCI6MTYyMjkwNjE5MSwiZXhwIjoxNjIyOTkyNTkxfQ.OvI2dVui8pdszuu4q1VXIvluACT12lst-eVUjDKRbJI