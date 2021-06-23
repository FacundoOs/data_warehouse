const { region, country, city } = require("../models/Regions");

class Regions {
  async newRegion(req, res) {
    const newRegion = new region(req.body);
    console.log(req.body);
    await newRegion
      .save()
      .then(() => res.status(200).json("Region added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async deleteRegion(req, res) {
    console.log(req.params);
    region
      .findOne(req.params)
      .then(async ({ countries }) => {
        countries.forEach(async (idCountry) => {
          country.findById(idCountry).then(async ({ cities }) => {
            cities.forEach(async (idCity) => {
              await city.findByIdAndDelete(idCity);
            });
            await country.findByIdAndDelete(idCountry);
          });
          // .catch((err) => res.status(400).json("Error: " + err));
        });
        await region.findByIdAndDelete(req.params);
        res.json("Region deleted!");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async updateRegion(req, res) {
    region
      .updateOne(req.params, req.body)
      .then(() => res.json("Region modified!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async allRegions(req, res) {
    region
      .find({}, { __v: 0 })
      .populate({
        path: "countries",
        select: "name",
        populate: {
          path: "cities",
          select: "name",
        },
      })
      .then((regions) => res.json(regions))
      .catch((err) => res.status(400).json("Error: " + err));
  }
}

module.exports = new Regions();
