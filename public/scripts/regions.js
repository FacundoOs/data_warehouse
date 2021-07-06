const token = JSON.parse(localStorage.getItem("token"));
const idUser = JSON.parse(localStorage.getItem("id"));

//Elementos de Arbol de Regiones
const bigContainer = document.getElementById("big-container");

//Borrar
const deleteTitle = document.getElementById("deleteModalTitle");
const submitDelete = document.getElementById("deleteOk");
const modalBody = document.getElementById("modal-body");

//Actualizar
const updateTitle = document.getElementById("updateModalTitle");
const updateText = document.getElementById("update-text");
const submitUpdate = document.getElementById("updateOk");
const updateModalBody = document.getElementById("update-modal-body");

//Crear
const createTitle = document.getElementById("createModalTitle");
const createText = document.getElementById("create-text");
const submitCreate = document.getElementById("createOk");
const createModalBody = document.getElementById("create-modal-body");

//Crear nueva Region
const inputRegion = document.getElementById("inputRegion");
const submitRegion = document.getElementById("submitRegion");

let modalDelete = document.getElementsByClassName("modal")[0];
let modalUpdate = document.getElementsByClassName("modal")[1];
let modalCreate = document.getElementsByClassName("modal")[2];

//Alert errores
const treeAlert = document.getElementById("tree-alert");
const treeAlertText = document.getElementById("tree-alert-text");
treeAlert.style.display = "none";

//Variable Global
import { basepathClient, basepathServer } from "./global.js";

//EventListeners
document.addEventListener("DOMContentLoaded", getRegions);
submitDelete.addEventListener("click", deleteMe);
submitUpdate.addEventListener("click", updateMe);
submitCreate.addEventListener("click", createMe);
submitRegion.addEventListener("click", createRegion);

//Obtener todos los usuarios
async function getRegions() {
  let fetchRegions = await fetch(`${basepathServer}regions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  let data = await fetchRegions.json();
  console.log(data);
  let regions = data;

  bigContainer.innerHTML = "";
  for (let p = 0; p < regions.length; p++) {
    let region = regions[p];

    createRegionUl(region);
  }
}

function createRegionUl(region) {
  let regionName = region.name;

  let regionId = region._id;

  let ulRegion = document.createElement("ul");
  ulRegion.className = "ul-region";
  ulRegion.title = regionName;
  ulRegion.id = regionId;

  let divRegion = document.createElement("div");
  divRegion.className = "region-div";
  divRegion.id = regionName;

  let pRegion = document.createElement("p");
  pRegion.textContent = regionName;
  pRegion.addEventListener("click", (event) => {
    let regionElements = event.currentTarget.parentNode.parentNode.children;

    toggleSection(regionElements);
  });
  let iEllipsis = document.createElement("i");
  iEllipsis.className = "fas fa-ellipsis-v";

  let iDelete = document.createElement("i");
  iDelete.className = "fas fa-trash-alt hidden";
  iDelete.title = "Delete Region";
  iDelete.setAttribute("data-target", "#deleteModal");
  iDelete.setAttribute("data-toggle", "modal");

  iDelete.addEventListener("click", () => {
    deleteTitle.textContent = "Delete Region";

    modalBody.id = regionId;
    modalBody.title = "regions";
    modalBody.innerText = `Are you sure you want to delete ${regionName}?`;
  });

  let iEdit = document.createElement("i");
  iEdit.className = "fas fa-edit hidden";
  iEdit.title = "Editar nombre de Región";
  iEdit.setAttribute("data-target", "#updateModal");
  iEdit.setAttribute("data-toggle", "modal");

  iEdit.addEventListener("click", () => {
    updateTitle.textContent = "Update Region";
    updateModalBody.id = regionId;
    updateModalBody.title = "regions";
  });

  let iNewCountry = document.createElement("i");
  iNewCountry.title = "Add country or region";
  iNewCountry.className = "fas fa-plus-circle hidden";
  iNewCountry.setAttribute("data-target", "#createModal");
  iNewCountry.setAttribute("data-toggle", "modal");

  iNewCountry.addEventListener("click", () => {
    createTitle.textContent = "Create new country";
    createModalBody.id = regionId;
    createModalBody.title = "countries";
    createText.setAttribute("placeholder", "Enter country name");
  });

  iEllipsis.addEventListener("click", () => {
    showIcons(iEdit, iDelete, iNewCountry);
  });

  let countries = region.countries;

  divRegion.appendChild(pRegion);
  divRegion.appendChild(iEllipsis);
  divRegion.appendChild(iDelete);
  divRegion.appendChild(iEdit);
  divRegion.appendChild(iNewCountry);
  ulRegion.appendChild(divRegion);

  bigContainer.appendChild(ulRegion);

  for (let a = 0; a < countries.length; a++) {
    let countryName = countries[a].name;
    let countryId = countries[a]._id;

    let ulCountry = document.createElement("ul");
    ulCountry.className = "ul-country";
    ulCountry.title = countryName;
    ulCountry.id = countryId;

    let divCountry = document.createElement("div");
    divCountry.className = "country-div";

    let pCountry = document.createElement("p");
    pCountry.textContent = countryName;
    pCountry.addEventListener("click", (event) => {
      let regionElements = event.currentTarget.parentNode.parentNode.children;
      toggleSection(regionElements);
    });
    let iEllipsisCountry = document.createElement("i");
    iEllipsisCountry.className = "fas fa-ellipsis-v";

    let iDeleteCountry = document.createElement("i");
    iDeleteCountry.title = "Eliminar País";
    iDeleteCountry.setAttribute("data-target", "#deleteModal");
    iDeleteCountry.setAttribute("data-toggle", "modal");

    iDeleteCountry.addEventListener("click", () => {
      deleteTitle.textContent = "Delete Country";
      modalBody.id = countryId;
      modalBody.title = "countries";
      modalBody.innerText = `Are you sure you want to delete ${countryName}?`;
    });

    let iEditCountry = document.createElement("i");
    iEditCountry.title = "Edit country name";
    iEditCountry.setAttribute("data-target", "#updateModal");
    iEditCountry.setAttribute("data-toggle", "modal");

    iEditCountry.addEventListener("click", () => {
      updateTitle.textContent = "Update Country";
      updateModalBody.id = countryId;
      updateModalBody.title = "countries";
    });

    let iNewCity = document.createElement("i");
    iNewCity.title = "Add City or Country";
    iNewCity.className = "fas fa-plus-circle hidden";
    iNewCity.setAttribute("data-target", "#createModal");
    iNewCity.setAttribute("data-toggle", "modal");

    iNewCity.addEventListener("click", () => {
      createTitle.textContent = "Create new City";
      createModalBody.id = countryId;
      createModalBody.title = "cities";
      createText.setAttribute("placeholder", "Enter city name");
    });

    iDeleteCountry.className = "fas fa-trash-alt hidden";
    iEditCountry.className = "fas fa-edit hidden";

    iEllipsisCountry.addEventListener("click", () => {
      showIcons(iEditCountry, iDeleteCountry, iNewCity);
    });

    divCountry.appendChild(pCountry);
    divCountry.appendChild(iEllipsisCountry);
    divCountry.appendChild(iDeleteCountry);
    divCountry.appendChild(iEditCountry);
    divCountry.appendChild(iNewCity);
    ulCountry.appendChild(divCountry);

    ulRegion.appendChild(ulCountry);

    let cities = countries[a].cities;

    for (let b = 0; b < cities.length; b++) {
      let cityName = cities[b].name;
      let cityId = cities[b]._id;

      let cityDiv = document.createElement("div");
      cityDiv.className = "city-div";

      let cityLi = document.createElement("li");
      cityLi.className = "li-city";
      cityLi.id = cityId;
      cityLi.textContent = cityName;

      let iEllipsisCity = document.createElement("i");
      iEllipsisCity.className = "fas fa-ellipsis-v";

      let iDeleteCity = document.createElement("i");
      iDeleteCity.title = "Delete city";
      iDeleteCity.setAttribute("data-target", "#deleteModal");
      iDeleteCity.setAttribute("data-toggle", "modal");
      iDeleteCity.addEventListener("click", () => {
        deleteTitle.textContent = "Delete City";
        modalBody.id = cityId;
        modalBody.title = "cities";
        modalBody.innerText = `Are you sure you want to delete ${cityName}?`;
      });

      let iEditCity = document.createElement("i");
      iEditCity.title = "Edit city name";
      iEditCity.setAttribute("data-target", "#updateModal");
      iEditCity.setAttribute("data-toggle", "modal");
      iEditCity.addEventListener("click", () => {
        updateTitle.textContent = "Update city";
        updateModalBody.id = cityId;
        updateModalBody.title = "cities";
      });

      iDeleteCity.className = "fas fa-trash-alt hidden";
      iEditCity.className = "fas fa-edit hidden";

      iEllipsisCity.addEventListener("click", () => {
        showIcons(iEditCity, iDeleteCity);
      });

      cityLi.appendChild(iEllipsisCity);
      cityLi.appendChild(iDeleteCity);
      cityLi.appendChild(iEditCity);
      cityDiv.appendChild(cityLi);

      ulCountry.appendChild(cityDiv);
    }
  }
}

function toggleSection(elements) {
  for (let k = 1; k < elements.length; k++) {
    if (!elements[k].classList.contains("hidden")) {
      elements[k].classList.add("hidden");
    } else {
      elements[k].classList.remove("hidden");
    }
  }
}

async function deleteMe(event) {
  let id = event.currentTarget.parentNode.parentNode.children[1].id;
  let deleteWhat = event.currentTarget.parentNode.parentNode.children[1].title;
  console.log(deleteWhat);

  try {
    let deleteMe = await fetch(`${basepathServer}${deleteWhat}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    let data = await deleteMe.json();

    if (deleteMe.status == 400) {
      console.log(data);
      treeAlert.style.display = "unset";
      treeAlertText.textContent = "Invalid field or a field with the same name already exists";
    } else {
      const element = document.getElementById(id);

      element.classList.add("fall");

      element.addEventListener("transitionend", () => {
        element.remove();
      });
    }
  } catch (e) {
    console.log(e);
    alert(e);
  }
}

async function updateMe(event) {
  let id = event.currentTarget.parentNode.parentNode.children[1].id;
  let updateWhat = event.currentTarget.parentNode.parentNode.children[1].title;
  let textValue = updateText.value;

  let newName = {
    name: textValue,
  };

  try {
    let updateMe = await fetch(`${basepathServer}${updateWhat}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newName),
    });

    let data = await updateMe.json();
    console.log(data);

    if (updateMe.status == 400) {
      console.log(data);
      treeAlert.style.display = "unset";
      treeAlertText.textContent = "Invalid field or a field with the same name already exists";
    } else {
      getRegions();
    }
  } catch (e) {
    console.log(e);
    alert(e);
  }
}

async function createMe(event) {
  let id = event.currentTarget.parentNode.parentNode.children[1].id;
  let updateWhat = event.currentTarget.parentNode.parentNode.children[1].title;
  let textValue = createText.value;
  console.log(id);
  console.log(updateWhat);
  console.log(textValue);

  let newName = {
    name: textValue,
  };

  try {
    let createMe = await fetch(`${basepathServer}${updateWhat}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newName),
    });

    let data = await createMe.json();

    if (createMe.status == 400) {
      console.log(data);
      treeAlert.style.display = "unset";
      treeAlertText.textContent = "Invalid field or a field with the same name already exists";
    } else {
      getRegions();
    }
  } catch (e) {
    console.log(e);
    alert(e);
  }
}
async function createRegion() {
  let regionName = inputRegion.value;

  let region = {
    name: regionName,
  };

  try {
    let createRegion = await fetch(`${basepathServer}regions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(region),
    });

    let data = await createRegion.json();
    console.log(createRegion.status);

    if (createRegion.status == 400) {
      console.log(data);
      treeAlert.style.display = "unset";
      treeAlertText.textContent = "Invalid field or a field with the same name already exists";
    } else {
      getRegions();
    }
  } catch (e) {
    console.log(e);
    alert(e);
  }
}

function showIcons(edit, delet, create) {
  if (create) {
    if (
      edit.classList.contains("hidden") &
      delet.classList.contains("hidden") &
      create.classList.contains("hidden")
    ) {
      edit.classList.remove("hidden");
      delet.classList.remove("hidden");
      create.classList.remove("hidden");
    } else {
      edit.classList.add("hidden");
      delet.classList.add("hidden");
      create.classList.add("hidden");
    }
  } else {
    if (edit.classList.contains("hidden") & delet.classList.contains("hidden")) {
      edit.classList.remove("hidden");
      delet.classList.remove("hidden");
    } else {
      edit.classList.add("hidden");
      delet.classList.add("hidden");
    }
  }
}
