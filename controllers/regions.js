const { region } = require("../models/Regions");

class Regions {
  async newRegion(req, res) {
    const newRegion = new region(req.body);

    newRegion
      .save()
      .then(() => res.json("Region added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async deleteRegion(req, res) {
    


  }
}

module.exports = new Regions();
