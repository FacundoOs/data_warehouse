const express = require("express");
const router = express.Router();

const login = require("../controllers/login");
const register = require("../controllers/register");
const auth = require("../middlewares/auth");
const admin = require("../controllers/adminUsers");
const regions = require("../controllers/regions")
const countries = require("../controllers/countries")
const cities = require("../controllers/cities")

router.post("/login", login);
router.post("/register", auth, register);

router.get("/users", auth, admin.getUsers);
router.delete("/users/:_id", auth, admin.deleteUsers);
router.put("/users/:_id", auth, admin.updateUser);

router.post("/regions", regions.newRegion)
router.delete("/regions/:_id", regions.deleteRegion)
router.put("/regions/:_id", regions.updateRegion)
router.get("/regions", regions.allRegions)

router.post("/countries/:_id", countries.newCountry)
router.delete("/countries/:_id", countries.deleteCountry)
router.put("/countries/:_id", countries.updateCountry)
router.get("/countries", countries.allCountries)

router.post("/cities/:_id", cities.newCities)
router.delete("/cities/:_id", cities.deleteCity)
router.put("/cities/:_id", cities.updateCity)
router.get("/cities", cities.allCities)



module.exports = router;
