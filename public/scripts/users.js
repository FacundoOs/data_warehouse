const token = JSON.parse(localStorage.getItem("token"));
const idUser = JSON.parse(localStorage.getItem("id"));

const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const profile = document.getElementById("profile");
const firstPassword = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const updateName = document.getElementById("update_name");
const updateLastname = document.getElementById("update_lastname");
const updateEmail = document.getElementById("update_email");
const updateProfile = document.getElementById("update_profile");

const eye = document.getElementById("eye");
const errorsMessage = document.getElementById("errors");
const alertCreation = document.getElementById("alertCreation");
const butonSubmit = document.getElementById("btnSubmit");

const helpPassword = document.getElementById("helpPassword");
helpPassword.style.display = "none";

const usersTable = document.getElementById("users-table");
//User delete modal
const deleteBody = document.getElementById("deleteBody");
const submitDelete = document.getElementById("deleteOk");
//User update modal
const modalBody = document.getElementsByClassName("modal-body");
const submitUpdate = document.getElementById("updateOk");

//Global Variable
import { basepathClient, basepathServer } from "./global.js";

//Event Listeners
document.addEventListener("DOMContentLoaded", checkIfAdmin); //Check if it is admin or user
document.addEventListener("DOMContentLoaded", getUsers);

eye.addEventListener("click", visiblePass);
firstPassword.addEventListener("focus", () => {
  helpPassword.style.display = "unset";
});
firstPassword.addEventListener("blur", () => {
  helpPassword.style.display = "none";
});
confirmPassword.addEventListener("keyup", passwordConfirm);
butonSubmit.addEventListener("click", registerUser);
submitUpdate.addEventListener("click", updateUser);
submitDelete.addEventListener("click", deleteUser);

async function getUsers(params) {
  let fetchUsers = await fetch(`${basepathServer}users/${idUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let users = await fetchUsers.json();
  console.log(users);

  for (let i = 0; i < users.length; i++) {
    let name = users[i].name;
    let lastname = users[i].lastName;
    let email = users[i].email;
    let profile = users[i].rol;
    let id = users[i]._id;

    createUserRow(name, lastname, email, profile, id);
  }
}

async function registerUser(event) {
  event.preventDefault();

  let newUser = {
    name: name.value,
    lastName: lastname.value,
    email: email.value,
    rol: profile.value,
    password: firstPassword.value,
  };
  console.table(newUser);

  let register = await fetch(`${basepathServer}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newUser),
  });

  let data = await register.json();

  console.log(data);

  if (((register.data === 400) != register.data) === 500) {
    errorsMessage.innerText = data.message;
  } else if (data.status == 403) {
    errorsMessage.innerText = data.message;
  }
  if (register.status == 201) {
    location.reload();
  }
}

async function deleteUser(event) {
  let id = event.currentTarget.parentNode.parentNode.children[1].id;

  let fetchDelete = await fetch(`${basepathServer}users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let data = await fetchDelete.json();
  console.log(data);

  if (!data.error) {
    window.location.reload();
  } else {
    alert(data.error);
  }
}

async function updateUser(event) {
  let id = event.currentTarget.parentNode.parentNode.children[1].id;

  let updateUser = {
    name: updateName.value,
    lastName: updateLastname.value,
    email: updateEmail.value,
    rol: updateProfile.value,
  };
  console.log(updateUser);

  let fetchUpdate = await fetch(`${basepathServer}users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateUser),
  });

  let data = await fetchUpdate.json();
  console.log(data);

  if (fetchUpdate.status != 400) {
    window.location.reload();
  } else {
    alert(data);
  }
}

//Show password
function visiblePass() {
  if (firstPassword.type === "password") {
    eye.className = "fas fa-eye";
    firstPassword.type = "text";
  } else {
    eye.className = "fas fa-eye-slash";
    firstPassword.type = "password";
  }
}

// Confirm password
function passwordConfirm() {
  if (firstPassword.value != confirmPassword.value) {
    errors.innerText = "Las contraseñas no coinciden";
    butonSubmit.setAttribute("disabled", true);
  } else {
    errors.innerText = "";
    butonSubmit.removeAttribute("disabled");
  }
}
//Check if it is admin or user
function checkIfAdmin() {
  const profile = JSON.parse(localStorage.getItem("profile"));

  if (profile == "User") {
    window.location.href = `${basepathClient}home.html`;
  }
}

function infoUsersByClick(event) {
  let name = event.currentTarget.parentNode.parentNode.children[0].innerText;
  let lastname = event.currentTarget.parentNode.parentNode.children[1].innerText;
  let email = event.currentTarget.parentNode.parentNode.children[2].innerText;
  let profile = event.currentTarget.parentNode.parentNode.children[3].innerText;
  let id = event.currentTarget.parentNode.parentNode.id;

  let user = {
    name: name,
    lastname: lastname,
    email: email,
    profile: profile,
    id: id,
  };

  return user;
}

function createUserRow(a, b, c, d, e) {
  let userRow = document.createElement("div");
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  let div3 = document.createElement("div");
  let div4 = document.createElement("div");
  let divEdits = document.createElement("div");
  let iEdit = document.createElement("i");
  let iDelete = document.createElement("i");

  userRow.className = "user-row";
  userRow.id = e;
  div1.className = "user-info";
  div2.className = "user-info";
  div3.className = "user-info";
  div4.className = "user-info";
  divEdits.className = "user-edit";
  iEdit.className = "fas fa-user-edit";
  iDelete.className = "fas fa-trash-alt";
  iDelete.setAttribute("data-target", "#deleteModal");
  iDelete.setAttribute("data-toggle", "modal");
  iEdit.setAttribute("data-target", "#updateModal");
  iEdit.setAttribute("data-toggle", "modal");

  div1.innerText = a;
  div2.innerText = b;
  div3.innerText = c;
  div4.innerText = d;

  userRow.appendChild(div1);
  userRow.appendChild(div2);
  userRow.appendChild(div3);
  userRow.appendChild(div4);
  divEdits.appendChild(iEdit);
  divEdits.appendChild(iDelete);
  userRow.appendChild(divEdits);
  usersTable.appendChild(userRow);

  iEdit.addEventListener("click", (event) => {
    let { name, lastname, email, profile, id } = infoUsersByClick(event);

    updateName.value = name;
    updateLastname.value = lastname;
    updateEmail.value = email;
    updateProfile.value = profile;

    modalBody[0].id = id;
  });

  iDelete.addEventListener("click", (event) => {
    let { name, lastname, id } = infoUsersByClick(event);

    modalBody[1].id = id;

    modalBody[1].innerText = `Are you sure you want to delete ${name} ${lastname}?`;
  });
}
