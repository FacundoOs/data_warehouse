const contact = require("../models/Contacts");
const { deleteCountry } = require("./countries");

class Contacts {
  async newContact(req, res) {
    const {
      name,
      lastName,
      position,
      email,
      company,
      region,
      country,
      city,
      address,
      interest,
      contactChannel,
    } = req.body;

    console.log(contactChannel);

    const contactData = await new contact({
      name: name,
      lastName: lastName,
      position: position,
      email: email,
      company: company,
      region: region,
      country: country,
      city: city,
      address: address,
      interest: interest,
    });

    contactData
      .save()
      .then(async (thisContact) => {
        await thisContact.contactChannel.push(contactChannel);
        await thisContact.save();

        res.json(thisContact);
      })

      .catch((err) => res.status(400).json("Error: " + err));
  }

  async deleteContact(req, res) {
    const idsContacts = req.body;
    try {
      idsContacts.forEach(async (contactId) => {
        const deletedContacts = await contact.findByIdAndDelete({ _id: contactId });
        console.log(deletedContacts);
      });
      res.json("Contact/s deleted");
    } catch (e) {
      console.log(e);
    }
  }

  async updateContact(req, res) {
    const {
      name,
      lastName,
      position,
      email,
      company,
      region,
      country,
      city,
      address,
      interest,
      contactChannel,
    } = req.body;

    contact
      .findByIdAndUpdate(req.params, {
        name: name,
        lastName: lastName,
        position: position,
        email: email,
        address: address,
        interest: interest,
      })
      .then(async (thisContact) => {
        await thisContact.contactChannel.pop();
        await thisContact.contactChannel.push(contactChannel);
        await thisContact.region.pop();
        await thisContact.region.push(region);
        await thisContact.country.pop();
        await thisContact.country.push(country);
        await thisContact.city.pop();
        await thisContact.city.push(city);
        await thisContact.company.pop();
        await thisContact.company.push(company);

        await thisContact
          .save()
          .then((contactUpdated) => {
            res.json(contactUpdated);
          })
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async allContacts(req, res) {
    contact
      .find({}, { __v: 0 })
      .populate({
        path: "company region country city",
        select: "name",
      })
      .then((contactsList) => res.json(contactsList))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async contactById(req, res) {
    contact
      .find(req.params)
      .populate({
        path: "company region country city",
        select: "name",
      })
      .then((thisContact) => res.json(thisContact))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  async sortContacts(req, res) {
    //req.params.order
    //receive 1 for Ascending order
    //receive -1 for Descending order

    //req.params.field
    //recieve field to sort
    const field = req.params.field;
    const order = req.params.order;

    contact
      .find({}, { __v: 0 })
      .populate({
        path: "company region country city",
        select: "name",
      })
      .sort({ field: order })
      .then((contactsList) => res.json(contactsList))
      .catch((err) => res.status(400).json("Error: " + err));
  }
}

module.exports = new Contacts();
