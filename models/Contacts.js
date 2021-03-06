const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  company: [
    {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  ],
  region: [
    {
      type: Schema.Types.ObjectId,
      ref: "Region",
    },
  ],
  country: [
    {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
  ],
  city: [
    {
      type: Schema.Types.ObjectId,
      ref: "City",
    },
  ],
  address: {
    type: String,
  },
  interest: {
    type: Number,
  },
  contactChannel: [
    {
      type: Array,
      channel: {
        type: String,
        enum: ["Phone", "Whatsapp", "Instagram", "Facebook", "Linkedin"],
      },
      userAccount: {
        type: String,
      },
      preferences: {
        type: String,
        enum: ["Favorite channel", "Not disturb", "No preference"],
      },
    },
  ],
});

module.exports = model("Contact", contactSchema);
