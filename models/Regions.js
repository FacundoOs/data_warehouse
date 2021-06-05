const { Schema, model } = require("mongoose");

const citySchema = new Schema({
  name: { type: String, unique: true },
});

const city = model("City", citySchema);

const countrySchema = new Schema({
  name: { typee: String, unique: true },
  cities: [
    {
      type: Schema.Types.ObjectId,
      ref: "City",
    },
  ],
});

const country = model("Country", countrySchema);

const regioSchema = new Schema({
  name: { type: String, unique: true },
  countries: [
    
    {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
  ],
});

const region = model("Region", regioSchema);

module.exports = {
  city, country, region
}