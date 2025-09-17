import { router } from "../src/routes/routes.js";

// Forzar la ruta inicial si no hay hash
if (!window.location.hash) {
  window.location.hash = "#/login";
}

// Ejecutar el router cuando cambia el hash
window.addEventListener("hashchange", router);

// Ejecutar el router también al cargar la página
window.addEventListener("load", router);
