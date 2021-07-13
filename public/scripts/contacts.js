const token = JSON.parse(localStorage.getItem("token"));
//Global vaiable
import { basepathServer } from "./global.js";

//New contact
const newContactBtn = document.getElementById("createContact");
const newContactContainer = document.getElementById("newContactContainer");
const selectCompany = document.getElementsByClassName("selectpicker")[0];
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const position = document.getElementById("position");
const email = document.getElementById("email");
const company = document.getElementById("company");
const selectRegion = document.getElementById("region");
const selectCountry = document.getElementById("country");
const selectCity = document.getElementById("city");
let address = document.getElementById("address");
let interest = document.getElementById("interest");
let rangeOutput = document.getElementById("range-span");
const phone = document.getElementById("phone");
const phonePreference = document.getElementById("phonePreference");
const whatsapp = document.getElementById("whatsapp");
const whatsappPreference = document.getElementById("whatsappPreference");
const instagram = document.getElementById("instagram");
const instagramPreference = document.getElementById("instagramPreference");
const facebook = document.getElementById("facebook");
const facebookPreference = document.getElementById("facebookPreference");
const linkedin = document.getElementById("linkedin");
const linkedinPreference = document.getElementById("linkedinPreference");
const btnSubmit = document.getElementById("btnSubmit");
const errors = document.getElementById("errors");

//Contactos
let contactTable = document.getElementById("contacts-table");
let resetTable = document.getElementById("reset-table");

//Delete contacts
let deleteContactsBtn = document.getElementById("deleteContacts");
deleteContactsBtn.innerText = "Borrar contactos seleccionados (0)";
let selectedContacts = [];
let selectedCounter = 0;
//Delete modal
const deleteBody = document.getElementById("deleteBody");
const submitDeleteContacts = document.getElementById("deleteOk");

//Update modal

let loginForm = document.getElementsByClassName("loginForm")[1];
const updateContactContainer = document.getElementById("updateContactContainer");
const selectCompanyUpdate = document.getElementsByClassName("selectpicker")[1];
const nameUpdate = document.getElementById("updatename");
const lastnameUpdate = document.getElementById("updatelastname");
const positionUpdate = document.getElementById("updateposition");
const emailUpdate = document.getElementById("updateemail");
const companyUpdate = document.getElementById("updatecompany");
const selectRegionUpdate = document.getElementById("updateregion");
const selectCountryUpdate = document.getElementById("updatecountry");
const selectCityUpdate = document.getElementById("updatecity");
const addressUpdate = document.getElementById("updateaddress");
let interestUpdate = document.getElementById("updateinterest");
let rangeOutputUpdate = document.getElementById("update-range-span");
let phoneUpdate = document.getElementById("updatephone");
let phonePreferenceUpdate = document.getElementById("updatephonePreference");
let whatsappUpdate = document.getElementById("updatewhatsapp");
let whatsappPreferenceUpdate = document.getElementById("updatewhatsappPreference");
let instagramUpdate = document.getElementById("updateinstagram");
let instagramPreferenceUpdate = document.getElementById("updateinstagramPreference");
let facebookUpdate = document.getElementById("updatefacebook");
let facebookPreferenceUpdate = document.getElementById("updatefacebookPreference");
let linkedinUpdate = document.getElementById("updatelinkedin");
let linkedinPreferenceUpdate = document.getElementById("updatelinkedinPreference");
let btnSubmitUpdate = document.getElementById("updatebtnSubmit");
let errorsUpdate = document.getElementById("updateerrors");

//Sort contacts
let sortByContact = document.getElementById("sort-contact");
let sortByCountry = document.getElementById("sort-country");
let sortByCompany = document.getElementById("sort-company");
let sortByPosition = document.getElementById("sort-position");
let sortByInterest = document.getElementById("sort-interest");

//Search contacts
let inputContact = document.getElementById("input-find-contact");
inputContact.addEventListener("input", () => findContacts(inputContact, 0));
let matchList = document.getElementById("match-list");

//Event Listener
document.addEventListener("DOMContentLoaded", appendCompaniesToSelects);
document.addEventListener(
  "DOMContentLoaded",
  appendRegionsToSelects(selectRegion, selectCountry, selectCity)
);
document.addEventListener(
  "DOMContentLoaded",
  appendRegionsToSelects(selectRegionUpdate, selectCountryUpdate, selectCityUpdate)
);
document.addEventListener("DOMContentLoaded", getContacts);
document.addEventListener("DOMContentLoaded", deleteAllSelectedFromLocal);
interest.addEventListener("change", () => {
  rangeOutputValue(interest, rangeOutput);
});
interestUpdate.addEventListener("change", () => {
  rangeOutputValue(interestUpdate, rangeOutputUpdate);
});
newContactBtn.addEventListener("click", () => (newContactContainer.style.display = "flex"));
btnSubmit.addEventListener("click", createNewContact);
btnSubmitUpdate.addEventListener("click", updateContact);
deleteContactsBtn.addEventListener("click", textDelete);
submitDeleteContacts.addEventListener("click", deleteSelectedContacts);
resetTable.addEventListener("click", getContacts);

// Click event to send the autocomplete text with the autocompleteValue to clear the search row
matchList.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "H6") {
    inputContact.value = e.target.innerHTML;
    matchList.innerHTML = "";
    let inputValue = inputContact;
    console.log(inputValue);
    findContacts(inputValue, 1);
  }
});

async function findContacts(inputContact, autocompleteValue) {
  let value = inputContact.value;

  let fetchContacts = await fetch(`${basepathServer}contacts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  let contacts = await fetchContacts.json();

  //Get matches to current text input
  let matches = filterSearch(contacts, value);

  if (autocompleteValue === 0) {
    createSearchRow(matches);
  }

  if (value.length === 0) {
    matches = [];
    matchList.innerHTML = "";
    contactTable.innerHTML = "";
    contacts.forEach((contact) => {
      createContactRow(contact);
    });
  }

  if (matches.length !== 0) {
    contactTable.innerHTML = "";
    matches.forEach((contact) => {
      createContactRow(contact);
    });
  }
}

//Filter the input comparing with the array of contacts
const filterSearch = (contacts, value) => {
  let matches = contacts.filter((contact) => {
    const regex = new RegExp(`^${value}`, "gi");
    return (
      contact.name.match(regex) ||
      contact.country[0].name.match(regex) ||
      contact.company[0].name.match(regex) ||
      contact.position.match(regex)
    );
  });
  return matches;
};

//Displays autocomplete
const createSearchRow = (matches) => {
  console.log(matches);
  let name = "";
  let data = "";
  if (matches.length > 0) {
    const html = matches
      .map((match) => {
        const regex = new RegExp(`^${inputContact.value}`, "gi");
        if (match.name.match(regex)) {
          name = match.name;
          data = "Name";
        }
        if (match.company[0].name.match(regex)) {
          name = match.company[0].name;
          data = "Company";
        }
        if (match.country[0].name.match(regex)) {
          name = match.country[0].name;
          data = "Country";
        }
        if (match.position.match(regex)) {
          name = match.position;
          data = "Position";
        }
        return `
        <div class="card">
        <h6>${name}</h6> <span class="text-primary search-info">${data}</span>
        </div>
          `;
      })
      .join("");

    matchList.innerHTML = html;
  }
};

async function createNewContact(event) {
  event.preventDefault();

  let companyId;
  if (company.options[company.selectedIndex] != undefined) {
    companyId = company.options[company.selectedIndex].id;
  }
  let regionId;
  let countryId;
  let cityId;

  if (
    selectRegion.options[selectRegion.selectedIndex] != undefined &&
    selectCountry.options[selectCountry.selectedIndex] != undefined &&
    selectCity.options[selectCity.selectedIndex] != undefined
  ) {
    regionId = selectRegion.options[selectRegion.selectedIndex].id;
    countryId = selectCountry.options[selectCountry.selectedIndex].id;
    cityId = selectCity.options[selectCity.selectedIndex].id;
  }

  let nuevoContacto = {
    name: name.value,
    lastName: lastname.value,
    position: position.value,
    email: email.value,
    company: companyId,
    region: regionId,
    country: countryId,
    city: cityId,
    address: address.value,
    interest: rangeOutput.innerText,
    contactChannel: [],
  };

  if (phone.value != "") {
    let phoneChannel = {
      channel: "Phone",
      usserAccount: phone.value,
      preferences: phonePreference.value,
    };
    nuevoContacto.contactChannel.push(phoneChannel);
  }
  if (whatsapp.value != "") {
    let whatsappChannel = {
      channel: "Whatsapp",
      usserAccount: whatsapp.value,
      preferences: whatsappPreference.value,
    };
    nuevoContacto.contactChannel.push(whatsappChannel);
  }
  if (instagram.value != "") {
    let instagramChannel = {
      channel: "Instagram",
      usserAccount: instagram.value,
      preferences: instagramPreference.value,
    };
    nuevoContacto.contactChannel.push(instagramChannel);
  }
  if (facebook.value != "") {
    let facebookChannel = {
      channel: "Facebook",
      usserAccount: facebook.value,
      preferences: facebookPreference.value,
    };
    nuevoContacto.contactChannel.push(facebookChannel);
  }
  if (linkedin.value != "") {
    let linkedinChannel = {
      channel: "Linkedin",
      usserAccount: linkedin.value,
      preferences: linkedinPreference.value,
    };
    nuevoContacto.contactChannel.push(linkedinChannel);
  }

  console.log(nuevoContacto);
  console.table(nuevoContacto);

  let sendNewContact = await fetch(`${basepathServer}contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoContacto),
  });

  let newContact = await sendNewContact.json();

  console.log(newContact);

  if (newContact.message) {
    errors.textContent = newContact.message;
  } else {
    location.reload();
  }
}

async function updateContact(event) {
  event.preventDefault();

  let contactId = loginForm.id;

  let companyId;
  if (companyUpdate.options[companyUpdate.selectedIndex] != undefined) {
    companyId = companyUpdate.options[companyUpdate.selectedIndex].id;
  }

  let regionId;
  let countryId;
  let cityId;
  if (
    selectRegionUpdate.options[selectRegionUpdate.selectedIndex] != undefined &&
    selectCountryUpdate.options[selectCountryUpdate.selectedIndex] != undefined &&
    selectCityUpdate.options[selectCityUpdate.selectedIndex] != undefined
  ) {
    regionId = selectRegionUpdate.options[selectRegionUpdate.selectedIndex].id;
    countryId = selectCountryUpdate.options[selectCountryUpdate.selectedIndex].id;
    cityId = selectCityUpdate.options[selectCityUpdate.selectedIndex].id;
  }

  let newData = {
    name: nameUpdate.value,
    lastName: lastnameUpdate.value,
    position: positionUpdate.value,
    email: emailUpdate.value,
    company: companyId,
    region: regionId,
    country: countryId,
    city: cityId,
    address: addressUpdate.value,
    interest: rangeOutputUpdate.innerText,
    contactChannel: [],
  };

  if (phoneUpdate.value != "") {
    let phoneChannel = {
      channel: "Phone",
      usserAccount: phoneUpdate.value,
      preferences: phonePreferenceUpdate.value,
    };
    newData.contactChannel.push(phoneChannel);
  }
  if (whatsappUpdate.value != "") {
    let whatsappChannel = {
      channel: "Whatsapp",
      usserAccount: whatsappUpdate.value,
      preferences: whatsappPreferenceUpdate.value,
    };
    newData.contactChannel.push(whatsappChannel);
  }
  if (instagramUpdate.value != "") {
    let instagramChannel = {
      channel: "Instagram",
      usserAccount: instagramUpdate.value,
      preferences: instagramPreferenceUpdate.value,
    };
    newData.contactChannel.push(instagramChannel);
  }
  if (facebookUpdate.value != "") {
    let facebookChannel = {
      channel: "Facebook",
      usserAccount: facebookUpdate.value,
      preferences: facebookPreferenceUpdate.value,
    };
    newData.contactChannel.push(facebookChannel);
  }
  if (linkedinUpdate.value != "") {
    let linkedinChannel = {
      channel: "Linkedin",
      usserAccount: linkedinUpdate.value,
      preferences: linkedinPreferenceUpdate.value,
    };
    newData.contactChannel.push(linkedinChannel);
  }

  // console.log(newData);
  // console.table(newData);

  let updateContact = await fetch(`${basepathServer}contacts/${contactId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });

  let updatedContact = await updateContact.json();

  if (newContact.message) {
    errors.textContent = newContact.message;
  } else {
    location.reload();
  }
}

async function deleteSelectedContacts() {
  let selectedContacts = checkIfSelectedContacts();
  console.log(selectedContacts);

  let fetchDeleteContacts = await fetch(`${basepathServer}contacts`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(selectedContacts),
  });

  let deletedData = await fetchDeleteContacts.json();

  console.log(fetchDeleteContacts);
  if (fetchDeleteContacts.status == 200) {
    location.reload();
  }
}

async function appendCompaniesToSelects() {
  let fetchCompanies = await fetch(`${basepathServer}companies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  let companies = await fetchCompanies.json();

  companies.forEach((element) => {
    let option = document.createElement("option");
    option.innerText = element.name;
    option.id = element._id;
    selectCompany.appendChild(option);
  });
  companies.forEach((element) => {
    let option = document.createElement("option");
    option.innerText = element.name;
    option.id = element._id;
    selectCompanyUpdate.appendChild(option);
  });
  $(".selectpicker").selectpicker("refresh");
}

function rangeOutputValue(interest, rangeOutput) {
  let value = interest.value;
  if (value == 0) rangeOutput.innerText = "0";
  if (value == 1) rangeOutput.innerText = "25";
  if (value == 2) rangeOutput.innerText = "50";
  if (value == 3) rangeOutput.innerText = "75";
  if (value == 4) rangeOutput.innerText = "100";
}

async function appendRegionsToSelects(selectRegion, selectCountry, selectCity) {
  let regions = await fetchRegions();

  regions.forEach((element) => {
    let option = document.createElement("option");
    option.innerText = element.name;
    option.id = element._id;
    selectRegion.appendChild(option);
  });

  selectRegion.addEventListener("change", () => {
    selectCountry.innerHTML = "";
    selectCity.innerHTML = "";

    let thisRegion = regions.filter((element) => element.name == selectRegion.value);

    let countries = thisRegion[0].countries;
    countries.forEach((country) => {
      let countryOption = document.createElement("option");
      countryOption.innerText = country.name;
      countryOption.id = country._id;
      selectCountry.appendChild(countryOption);
    });
    let thisCountry = countries.filter((element) => element.name == selectCountry.value);
    let cities = thisCountry[0].cities;

    cities.forEach((city) => {
      let cityOption = document.createElement("option");
      cityOption.innerText = city.name;
      cityOption.id = city._id;
      selectCity.appendChild(cityOption);
    });
  });

  selectCountry.addEventListener("change", () => {
    selectCity.innerHTML = "";

    let thisRegion = regions.filter((element) => element.name == selectRegion.value);
    let countries = thisRegion[0].countries;

    let thisCountry = countries.filter((element) => element.name == selectCountry.value);
    let cities = thisCountry[0].cities;

    cities.forEach((city) => {
      let cityOption = document.createElement("option");
      cityOption.innerText = city.name;
      cityOption.id = city._id;
      selectCity.appendChild(cityOption);
    });
  });
}

async function getContacts() {
  let fetchContacts = await fetch(`${basepathServer}contacts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  let contacts = await fetchContacts.json();

  contactTable.innerHTML = "";
  contacts.forEach((contact) => {
    createContactRow(contact);
  });
}

async function getContactById(contactId) {
  let fetchContact = await fetch(`${basepathServer}contacts/${contactId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  let info = await fetchContact.json();
  let contact = info[0];
  return contact;
}

function createContactRow(contact) {
  let contactId = contact._id;
  let name = contact.name;
  let lastname = contact.lastName;
  let email = contact.email;
  let address = contact.address;

  let region;
  let country;
  let city;
  if (
    contact.region[0] == undefined ||
    contact.country[0] == undefined ||
    contact.city[0] == undefined
  ) {
    region = "Missing";
    country = "";
    city = "";
  } else {
    region = contact.region[0].name;
    country = contact.country[0].name;
    city = contact.city[0].name;
  }

  let company = contact.company[0].name;
  let position = contact.position;
  let interest = contact.interest;

  let contactChannelsArray = contact.contactChannel;

  let contactRow = document.createElement("div");
  let checkbox = document.createElement("input");

  //Name, lastname, email
  let div1 = document.createElement("div");

  let pName = document.createElement("p");
  let smallEmail = document.createElement("small");

  //Country and Region
  let div2 = document.createElement("div");
  let smallCity = document.createElement("small");
  let pCountry = document.createElement("p");
  let smallRegion = document.createElement("small");

  let div3 = document.createElement("div");
  let div4 = document.createElement("div");

  //Interest
  let div5 = document.createElement("div");

  managinContactChannels(contactChannelsArray, div5);

  let div6 = document.createElement("div");
  let divProgress = document.createElement("div");
  let divProgressBar = document.createElement("div");

  let divEdits = document.createElement("div");
  let iEdit = document.createElement("i");

  contactRow.className = "contact-row";
  contactRow.id = contactId;
  checkbox.className = "contact-checkbox";
  div1.className = "contact-info";
  div2.className = "contact-info";
  div3.className = "contact-info";
  div4.className = "contact-info";
  div5.className = "contact-info";
  div6.className = "contact-info";
  divProgress.className = "progress";
  divProgressBar.className = "progress-bar";

  checkbox.setAttribute("type", "checkbox");
  divProgressBar.setAttribute("role", "progressbar");
  divProgressBar.setAttribute("style", `width: ${interest}%`);
  if (interest == 25) divProgressBar.style.backgroundColor = "#008080";
  if (interest == 50) divProgressBar.style.backgroundColor = "#008000";
  if (interest == 75) divProgressBar.style.backgroundColor = "#ffa500";
  if (interest == 100) divProgressBar.style.backgroundColor = "#ff0000";
  divProgressBar.innerText = `${interest}%`;

  divEdits.className = "contact-edit";
  iEdit.className = "fas fa-user-edit";
  iEdit.setAttribute("data-target", "#updateModal");
  iEdit.setAttribute("data-toggle", "modal");

  iEdit.addEventListener("click", async () => {
    updateContactContainer.style.display = "flex";
    let contactInfo = await getContactById(contactId);

    fillUpdateModalInfo(contactInfo);
  });

  pName.innerText = `${name} ${lastname}`;
  smallEmail.innerText = email;

  smallCity.innerText = city;
  pCountry.innerText = country;
  smallRegion.innerText = region;

  div3.innerText = company;
  div4.innerText = position;

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      contactRow.className = "contact-row selected-row";
      selectedCounter += 1;
      //Add contact to localstorage
      saveSelectedContact(contactId);
      deleteContactsBtn.innerText = `Delete selected contacts (${selectedCounter})`;
    } else {
      contactRow.className = "contact-row";
      selectedCounter -= 1;
      //Remuevo contacto de localstorage
      removeSelectedContact(contactId);
      deleteContactsBtn.innerText = `Delete selected contacts (${selectedCounter})`;
    }
  });

  div1.appendChild(pName);
  div1.appendChild(smallEmail);

  div2.appendChild(smallCity);
  div2.appendChild(pCountry);
  div2.appendChild(smallRegion);

  divProgress.appendChild(divProgressBar);
  div6.appendChild(divProgress);

  contactRow.appendChild(checkbox);
  contactRow.appendChild(div1);
  contactRow.appendChild(div2);
  contactRow.appendChild(div3);
  contactRow.appendChild(div4);
  contactRow.appendChild(div5);
  contactRow.appendChild(div6);

  divEdits.appendChild(iEdit);
  contactRow.appendChild(divEdits);

  contactTable.appendChild(contactRow);
}

function managinContactChannels(contactChannelsArray, div5) {
  contactChannelsArray.forEach((contactChannel) => {
    contactChannel.forEach((channel) => {
      if (channel.preferences == "Favorite channel") {
        let channelDiv = document.createElement("div");
        channelDiv.className = "channel";
        channelDiv.innerText = channel.channel;

        channelDiv.addEventListener("click", () => {
          if (channelDiv.innerHTML == `${channel.channel} <br> (${channel.usserAccount})`) {
            channelDiv.innerText = channel.channel;
          } else {
            channelDiv.innerHTML = `${channel.channel} <br> (${channel.usserAccount})`;
          }
        });
        div5.appendChild(channelDiv);
      }
    });
    let canalesFav = contactChannel.filter((channel) => channel.preferences == "Favorite channel");
    let canalesSinPreferencia = contactChannel.filter(
      (channel) => channel.preferences == "No preference"
    );

    if (canalesFav.length == 0) {
      let noChannel = document.createElement("div");
      noChannel.className = "channel";
      noChannel.innerText = "Only email";
      div5.appendChild(noChannel);
    }
  });
}

function checkIfSelectedContacts() {
  let selectedContacts;

  if (localStorage.getItem("selectedContacts") === null) {
    selectedContacts = [];
  } else {
    selectedContacts = JSON.parse(localStorage.getItem("selectedContacts"));
  }
  return selectedContacts;
}

function saveSelectedContact(contactId) {
  let selectedContacts = checkIfSelectedContacts();

  selectedContacts.push(contactId);
  localStorage.setItem("selectedContacts", JSON.stringify(selectedContacts));
}

function removeSelectedContact(contactId) {
  let selectedContacts = checkIfSelectedContacts();

  const selectedIndex = selectedContacts.indexOf(contactId);
  selectedContacts.splice(selectedIndex, 1);

  localStorage.setItem("selectedContacts", JSON.stringify(selectedContacts));
}

function deleteAllSelectedFromLocal() {
  localStorage.setItem("selectedContacts", JSON.stringify(selectedContacts));
}

function textDelete() {
  let selectedContacts = checkIfSelectedContacts();

  let contactsLength = selectedContacts.length;

  if (contactsLength == 1) {
    deleteBody.innerText = `¿Are you sure you want to delete the contact?`;
    submitDeleteContacts.removeAttribute("disabled");
  } else if (contactsLength > 1) {
    deleteBody.innerText = `¿Are you sure you want to delete ${contactsLength} contacts?`;
    submitDeleteContacts.removeAttribute("disabled");
  } else {
    deleteBody.innerText = `No contact selected`;
    submitDeleteContacts.setAttribute("disabled", true);
  }
}

async function fillUpdateModalInfo(contact) {
  loginForm.id = contact._id;
  //Reset data
  nameUpdate.value = "";
  lastnameUpdate.value = "";
  positionUpdate.value = "";
  emailUpdate.value = "";
  addressUpdate.value = "";
  rangeOutputUpdate.innerText = "";
  interestUpdate.value = 0;
  phoneUpdate.value = "";
  phonePreferenceUpdate.value = "No preference";
  whatsappUpdate.value = "";
  whatsappPreferenceUpdate.value = "No preference";
  instagramUpdate.value = "";
  instagramPreferenceUpdate.value = "No preference";
  facebookUpdate.value = "";
  facebookPreferenceUpdate.value = "No preference";
  linkedinUpdate.value = "";
  linkedinPreferenceUpdate.value = "No preference";

  nameUpdate.value = contact.name;
  lastnameUpdate.value = contact.lastName;
  positionUpdate.value = contact.position;
  emailUpdate.value = contact.email;

  let arrayCompanyOptions = Array.from($(".selectpicker")[1].children);
  let contactCompany = arrayCompanyOptions.find(
    (option) => option.innerText == contact.company[0].name
  );
  contactCompany.setAttribute("selected", true);
  $(".selectpicker").selectpicker("refresh");

  addressUpdate.value = contact.address;

  if (
    contact.region[0] != undefined &&
    contact.country[0] != undefined &&
    contact.city[0] != undefined
  ) {
    let arrayRegionOptions = Array.from(selectRegionUpdate.options);

    let indexOfRegion = arrayRegionOptions.findIndex(
      (option) => option.value == contact.region[0].name
    );

    selectRegionUpdate.options.selectedIndex = indexOfRegion;

    let regions = await fetchRegions();

    let thisRegion = regions.filter((element) => element.name == contact.region[0].name);

    let countries = thisRegion[0].countries;

    selectCountryUpdate.innerHTML = "";

    countries.forEach((country) => {
      let countryOption = document.createElement("option");
      countryOption.innerText = country.name;
      countryOption.id = country._id;

      if (countryOption.innerText == contact.country[0].name) {
        countryOption.setAttribute("selected", true);
      }

      selectCountryUpdate.appendChild(countryOption);
    });

    let thisCountry = countries.filter((element) => element.name == contact.country[0].name);
    let cities = thisCountry[0].cities;

    selectCityUpdate.innerHTML = "";
    cities.forEach((city) => {
      let cityOption = document.createElement("option");
      cityOption.innerText = city.name;
      cityOption.id = city._id;
      if (cityOption.innerText == contact.city[0].name) {
        cityOption.setAttribute("selected", true);
      }
      selectCityUpdate.appendChild(cityOption);
    });
  } else {
    selectRegionUpdate.innerHTML = "<option selected disabled>Select region</option>";
    selectCountryUpdate.innerHTML = "";
    selectCityUpdate.innerHTML = "";
    let regions = await fetchRegions();
    regions.forEach((element) => {
      let option = document.createElement("option");
      option.innerText = element.name;
      option.id = element._id;
      selectRegionUpdate.appendChild(option);
    });
  }

  rangeOutputUpdate.innerText = `${contact.interest}`;
  if (contact.interest == 0) interestUpdate.value = 0;
  if (contact.interest == 25) interestUpdate.value = 1;
  if (contact.interest == 50) interestUpdate.value = 2;
  if (contact.interest == 75) interestUpdate.value = 3;
  if (contact.interest == 100) interestUpdate.value = 4;

  let contactChannels = contact.contactChannel[0];
  if (contactChannels != "") {
    contactChannels.forEach((channel) => {
      if (channel.channel == "Phone" && channel.preferences != "") {
        phoneUpdate.value = channel.usserAccount;
        phonePreferenceUpdate.value = channel.preferences;
      }
      if (channel.channel == "Whatsapp" && channel.preferences != "") {
        whatsappUpdate.value = channel.usserAccount;
        whatsappPreferenceUpdate.value = channel.preferences;
      }
      if (channel.channel == "Instagram" && channel.preferences != "") {
        instagramUpdate.value = channel.usserAccount;
        instagramPreferenceUpdate.value = channel.preferences;
      }
      if (channel.channel == "Facebook" && channel.preferences != "") {
        facebookUpdate.value = channel.usserAccount;
        facebookPreferenceUpdate.value = channel.preferences;
      }
      if (channel.channel == "Linkedin" && channel.preferences != "") {
        linkedinUpdate.value = channel.usserAccount;
        linkedinPreferenceUpdate.value = channel.preferences;
      }
    });
  }
}

async function fetchRegions() {
  let fetchRegions = await fetch(`${basepathServer}regions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  let regions = await fetchRegions.json();
  return regions;
}

async function sortTableByColumn(fieldV, orderV) {
  let field = fieldV;
  let order = orderV;

  let fetchSortedContacts = await fetch(`${basepathServer}contacts/sort/${field}&${order}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  let contacts = await fetchSortedContacts.json();
  contactTable.innerHTML = "";
  contacts.forEach((contact) => {
    createContactRow(contact);
  });
}

let orderContact = 0;
sortByContact.addEventListener("click", () => {
  if (orderContact == 0) {
    orderContact = 1;
  } else if (orderContact == 1) {
    orderContact = -1;
  } else if (orderContact == -1) {
    orderContact = 1;
  }

  let field = "name";
  sortTableByColumn(field, orderContact);
});

let orderCountry = 0;
sortByCountry.addEventListener("click", () => {
  if (orderCountry == 0) {
    orderCountry = 1;
  } else if (orderCountry == 1) {
    orderCountry = -1;
  } else if (orderCountry == -1) {
    orderCountry = 1;
  }

  let field = "country";
  sortTableByColumn(field, orderCountry);
});

let orderCompany = 0;
sortByCompany.addEventListener("click", () => {
  if (orderCompany == 0) {
    orderCompany = 1;
  } else if (orderCompany == 1) {
    orderCompany = -1;
  } else if (orderCompany == -1) {
    orderCompany = 1;
  }

  let field = "company";
  sortTableByColumn(field, orderCompany);
});

let orderPosition = 0;
sortByPosition.addEventListener("click", () => {
  if (orderPosition == 0) {
    orderPosition = 1;
  } else if (orderPosition == 1) {
    orderPosition = -1;
  } else if (orderPosition == -1) {
    orderPosition = 1;
  }

  let field = "position";
  sortTableByColumn(field, orderPosition);
});

let orderInterest = 0;
sortByInterest.addEventListener("click", () => {
  if (orderInterest == 0) {
    orderInterest = 1;
  } else if (orderInterest == 1) {
    orderInterest = -1;
  } else if (orderInterest == -1) {
    orderInterest = 1;
  }

  let field = "interest";
  sortTableByColumn(field, orderInterest);
});
