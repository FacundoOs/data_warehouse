const User = require("../models/User");
const bcrypt = require("bcrypt");

const firstAdmin = async () => {
  const adminExist = await User.find({ email: "adminAccount@mail.com" });

  if (adminExist == "") {
    const hashPassword = await bcrypt.hash(process.env.FIRST_ADMIN, 10);

    const firstAdmin = new User({
      name: "Admin",
      lastName: "Account",
      email: "adminAccount@mail.com",
      rol: "Admin",
      password: hashPassword,
    });

    try {
      const savedAdmin = await firstAdmin.save();
      console.log(savedAdmin);
      res.json({ message: "User created" });
      return
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = firstAdmin;
