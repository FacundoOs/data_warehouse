const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const submitBtn = document.getElementById("btn");
const errorsMessage = document.getElementById("errors");
const input = document.getElementsByClassName("form-control");
const title = document.getElementById("title-dataw");
import { basepathClient, basepathServer } from "./global.js";

//Event Listeners
document.addEventListener("DOMContentLoaded", alreadyLogIn);
submitBtn.addEventListener("click", logInUser);
input[0].addEventListener("keydown", () => {
  if (errorsMessage.innerText != "") {
    errorsMessage.innerText = "";
  }
});
input[1].addEventListener("keydown", () => {
  if (errorsMessage.innerText != "") {
    errorsMessage.innerText = "";
  }
});

let typedOptions = {
  strings: ["Welcome to Data Warehouse", "Bienvenido a Data Warehouse"],
  typeSpeed: 100,
  startDelay: 650,
  smartBackspace: true,
  backSpeed: 50,
  showCursor: false,
};
let typed = new Typed(title, typedOptions);

function alreadyLogIn() {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token != null) {
    window.location.href = `${basepathClient}home.html`;
    return;
  }
}

async function logInUser(event) {
  event.preventDefault();

  let email = inputEmail.value;
  let password = inputPassword.value;

  let user = {
    email: email,
    password: password,
  };

  let fetchLogin = await fetch(`${basepathServer}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  let respFetchLogin = await fetchLogin.json();

  if (fetchLogin.status != 200) {
    errorsMessage.innerText = respFetchLogin.message;
  } else {
    console.log(respFetchLogin);
    let profile = respFetchLogin.user.rol;
    let id = respFetchLogin.user._id;
    let token = respFetchLogin.jwt;

    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("id", JSON.stringify(id));

    window.location.href = `${basepathClient}home.html`;
  }
}
