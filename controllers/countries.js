const { region, country, city } = require("../models/Regions");

class Countries {
  async newCountry(req, res) {
    const checkRegion = await region.findById(req.params);
    // console.log(req.params)
    // console.log(checkRegion)
    if (checkRegion == null) {
      res.status(400).json("There is not region with this id");
      return;
    }

    const existCountry = await country.find(req.body);
    // console.log(req.body)
    // console.log(existCountry)
    if (existCountry != "") {
      res.status(400).json("The country already exist");
      return;
    }

    const newCountry = new country(req.body);

    newCountry
      .save()
      .then(async () => {
        await checkRegion.countries.push(newCountry);
        await checkRegion
          .save()
          .then(() => res.json("Country added!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async deleteCountry(req, res) {
    country
      .findOne(req.params)
      .then(({ cities }) => {
        console.log(cities);
        cities.forEach(async (idCity) => {
          await city.findByIdAndDelete(idCity);
        });
        country
          .findByIdAndDelete(req.params)
          .then(() => res.json("Country deleted!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async updateCountry(req, res) {
    country
      .updateOne(req.params, req.body)
      .then(() => res.json("Country modified!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async allCountries(req, res) {
    country
      .find({}, { __v: 0 })
      .populate({
        path: "cities",
        select: "name",
      })
      .then((countries) => res.json(countries))
      .catch((err) => res.status(400).json("Error: " + err));
  }
}

module.exports = new Countries();
