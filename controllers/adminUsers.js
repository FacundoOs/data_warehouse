const User = require("../models/User");

class AdminUsers {
  async getUsers(req, res) {
    User.find({ email: { $ne: req.body.email } }, { __v: 0, password: 0, date: 0 })
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async deleteUsers(req, res) {
    User.findByIdAndDelete(req.params)
      .then(() => res.json("User deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async updateUser(req, res) {
    User.findById(req.params._id)
      .then((user) => {
        user.name = req.body.name;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.rol = req.body.rol;

        user
          .save()
          .then(() => res.json("User updated."))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
}

module.exports = new AdminUsers();
