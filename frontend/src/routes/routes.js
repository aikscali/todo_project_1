import { LoginPage } from "../pages/login/login.js";

const routes = {
  "/login": LoginPage,
};

export function router() {
  const app = document.getElementById("app"); 
  app.innerHTML = "";

  const path = window.location.hash.slice(1) || "/login"; 
  const Page = routes[path] || (() => document.createTextNode("404 - Not Found"));

  app.appendChild(Page());
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
