const express = require("express");
const router = express.Router();
const login = require("../controllers/login");

// router.route("/login").post(login);
router.post("/login", login);

module.exports = router;
