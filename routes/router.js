const express = require("express");
const router = express.Router();

const login = require("../controllers/login");
const register = require("../controllers/register");
const auth = require("../middlewares/auth");
const admin = require("../controllers/adminUsers");

router.post("/login", login);
router.post("/register", auth, register);

router.get("/users", auth, admin.getUsers);
router.delete("/users/:_id", auth, admin.deleteUsers);
router.put("/users/:_id", auth, admin.updateUser);

module.exports = router;
