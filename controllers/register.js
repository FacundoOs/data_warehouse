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
      res.status(201).json({ message: "User created" });
    } catch (e) {
      // console.log(e);
      res.status(400).json({ message: "Fill all the fields" });
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

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQWNjb3VudEBtYWlsLmNvbSIsImlhdCI6MTYyMjkzMTQ5NCwiZXhwIjoxNjIzMDE3ODk0fQ.k29f0NLV3ZBn0hI-j5IKfjfneTIz2wjZTN7m0E28a6M