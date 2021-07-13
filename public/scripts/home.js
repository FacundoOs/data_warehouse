const logout = document.getElementById("logOut");
const welcome = document.getElementById("welcome");
const users = document.getElementById("users");
const ul = document.getElementById("ul");
const burger = document.getElementById("burger");
const menu = document.getElementById("rigth-nav");
import { basepathClient, basepathServer } from "./global.js";

//Event listeners
document.addEventListener("DOMContentLoaded", fetchAuth);
burger.addEventListener("click", toggleMenu);
logOut.addEventListener("click", closeSession);

async function fetchAuth() {
  const token = JSON.parse(localStorage.getItem("token"));
  const profile = JSON.parse(localStorage.getItem("profile"));

  console.log(profile);
  console.log(token);

  if (profile == "User") {
    users.remove();
    ul.style.justifyContent = "space-around";
  }

  if (token === null) {
    window.location.href = `${basepathClient}login.html`;
    return;
  } else {
    let fetchLogin = await fetch(`${basepathServer}auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    let fetchJson = await fetchLogin.json();
    console.log(fetchJson);
    let email = fetchJson.email;

    //Welcome message
    welcome.innerText = `Welcome ${email}`;

    // if (fetchJson) {
    //   window.location.href = `${process.env.BASEPATHSERVER}login`;
    // }
  }
}

function toggleMenu() {
  if (burger.className == "fas fa-bars") {
    burger.className = "fas fa-times";
    menu.style.display = "flex";
  } else {
    burger.className = "fas fa-bars";
    menu.style.display = "none";
  }
}

function closeSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
  fetchAuth();
}
// logOut.addEventListener('click',()=>{
//   console.log("22222")
//   localStorage.removeItem('token');
//   localStorage.removeItem('profile');
//   fetchAuth();
// })
