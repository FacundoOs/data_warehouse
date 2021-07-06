const { city, country, region } = require("../models/Regions");

class Cities {
  async newCities(req, res) {
    const checkCountry = await country.findById(req.params);
    // console.log(req.params)
    // console.log(checkRegion)
    if (checkCountry == null) {
      res.status(400).json("There is no country with that id");
      return;
    }

    const existCity = await city.find(req.body);
    // console.log(req.body)
    // console.log(existCountry)
    if (existCity != "") {
      res.status(400).json("The city you want to create already exists");
      return;
    }

    const newCity = new city(req.body);

    newCity
      .save()
      .then(async () => {
        await checkCountry.cities.push(newCity);
        await checkCountry
          .save()
          .then(() => res.json("City added!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async deleteCity(req, res) {
    city
      .findByIdAndDelete(req.params)
      .then(() => res.json("City deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async updateCity(req, res) {
    city
      .updateOne(req.params, req.body)
      .then(() => res.json("City modified!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async allCities(req, res) {
    city
      .find({}, { __v: 0, _id: 0 })
      .then((cities) => res.json(cities))
      .catch((err) => res.status(400).json("Error: " + err));
  }
}

module.exports = new Cities();
