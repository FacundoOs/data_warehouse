const Company = require("../models/Companies");
const { city } = require("../models/Regions");

class Companies {
  async newCompany(req, res) {
    city
      .findOne({ name: req.body.city })
      .then(async ({ _id }) => {
        const newCompany = await new Company({
          name: req.body.name,
          address: req.body.address,
          email: req.body.email,
          phone: req.body.phone,
        });
        await newCompany
          .save()
          .then(async (thisCompany) => {
            await thisCompany.city.push(_id);
            await thisCompany.save();
            res.json("Company added!");
          })
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async deleteCompany(req, res) {
    Company.findByIdAndDelete(req.params)
      .then(() => res.json("Company deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async updateCompany(req, res) {
    Company.findByIdAndUpdate(req.params, {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
    })
      .populate({
        path: "city",
        select: "name",
      })
      .then((company) => {
        if (req.body.city != company.city[0].name) {
          city
            .findOne({ name: req.body.city })
            .then(async (cityChange) => {
              console.log(cityChange);
              await company.city.pop();
              await company.city.push(cityChange);
              await company.save();
            })
            .catch((err) => res.status(400).json("Error: " + err));
        }
        res.json("Company modified!");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async allCompanies(req, res) {
    Company
      .find({}, { __v: 0, _id: 0 })
      .populate({
        path: "city",
        select: "name",
      })
      .then((companies) => res.json(companies))
      .catch((err) => res.status(400).json("Error: " + err));
  }
}

module.exports = new Companies();
