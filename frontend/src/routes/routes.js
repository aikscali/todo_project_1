//
//import { LoginPage } from "../pages/login/login.js";

//const routes = {
//  "/login": LoginPage,
//};

//export function router() {
//  const app = document.getElementById("app"); 
//  app.innerHTML = "";

//  const path = window.location.hash.slice(1) || "/login"; 
//  const Page = routes[path] || (() => document.createTextNode("404 - Not Found"));

//  app.appendChild(Page());
//}


//window.addEventListener("hashchange", router);
//window.addEventListener("load", router);
//

// routes.js no se usa en Sprint 1.
// Cada vista (login, register, dashboard) está hecha en HTML + JS plano,
// por lo tanto se accede directamente a:
//   - /src/pages/login/login.html
//   - /src/pages/register/signin.html
//   - /src/pages/dashboard/dashboard.html
//
// En un Sprint futuro, si se quiere manejar enrutamiento con hash (#),
// aquí se podrá implementar el router en JS.

export function router() {
  console.warn("El enrutador no está activo en Sprint 1.");
}