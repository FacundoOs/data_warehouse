const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
const register = require("../controllers/register");
const auth = require("../middlewares/auth")

// router.route("/login").post(login);
router.post("/login", login);
router.post("/register", auth, register);
// router.route('/register').post(auth,register); 


module.exports = router;
