const { region, country } = require("../models/Regions");

class Countries {
  async newCountry(req, res) {
    const checkRegion = await region.findById(req.params);
    // console.log(req.params)
    // console.log(checkRegion)
    if (checkRegion == null) {
      res.status(400).json("No existe region con ese id");
      return;
    }

    const existCountry = await country.find(req.body);
    // console.log(req.body)
    // console.log(existCountry)
    if (existCountry != "") {
      res.status(400).json("Ya existe el pais que quiere crear");
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
}

module.exports = new Countries();
