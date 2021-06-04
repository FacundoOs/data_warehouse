const User = require("../models/User");
const bcrypt = require("bcrypt");

const firstAdmin = async () => {
  const adminExist = await User.find({ email: "admin@mail.com" });

  if (adminExist == "") {
    const hashPasswrod = await bcrypt.hash(process.env.FIRST_ADMIN, 10);

    const firstAdmin = new User({
      name: "Admin",
      lastName: "Account",
      email: "adminAccount@mail.com",
      rol: "Admin",
      password: hashPasswrod,
    });

    try {
      const savedAdmin = await firstAdmin.save();
      console.log(savedAdmin);
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = firstAdmin;
