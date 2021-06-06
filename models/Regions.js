const { Schema, model } = require("mongoose");

const citySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const city = model("City", citySchema);

const countrySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  cities: [
    {
      type: Schema.Types.ObjectId,
      ref: "City",
    },
  ],
});

const country = model("Country", countrySchema);

const regionSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  countries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
  ],
});

const region = model("Region", regionSchema);

module.exports = {
  city,
  country,
  region,
};
