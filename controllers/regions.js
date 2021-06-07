const { region, country, city } = require("../models/Regions");

class Regions {
  async newRegion(req, res) {
    const newRegion = new region(req.body);

    newRegion
      .save()
      .then(() => res.json("Region added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async deleteRegion(req, res) {
    console.log(req.params);
    region
      .findOne(req.params)
      .then(async ({ countries }) => {
        countries.forEach(async (idCountry) => {
          country
            .findById(idCountry)
            .then(async ({ cities }) => {
              cities.forEach(async (idCity) => {
                await city.findByIdAndDelete(idCity);
              });
              await country.findByIdAndDelete(idCountry);
            })
            .catch((err) => res.status(400).json("Error: " + err));
        });
        await region.findByIdAndDelete(req.params);
        res.json("Region deleted!");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
}

module.exports = new Regions();
