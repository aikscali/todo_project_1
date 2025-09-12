// test.js
const axios = require("axios");

const BASE_URL = "http://localhost:8080/api/v1/tasks";

async function runTests() {
  try {
    // 🔹 GET: listar tareas
    console.log("🔄 Probando GET /tasks...");
    let res = await axios.get(BASE_URL);
    if (res.data.length === 0) {
      console.log("No hay tareas todavía.");
    } else {
      console.log("✅ Tareas existentes:");
      res.data.forEach((task, i) => {
        console.log(`${i + 1}. ${task.title} - ${task.detail} - ${task.datetime}`);
      });
    }

    // 🔹 POST: crear tarea
    console.log("\n🔄 Probando POST /tasks...");
    res = await axios.post(BASE_URL, {
      title: "Tarea de prueba",
      detail: "Creada desde test.js",
      datetime: new Date().toISOString(), // obligatorio
    });

    const nueva = res.data.task; // tu backend devuelve { message, task }
    console.log("✅ Tarea creada:");
    console.log(`- ${nueva.title} - ${nueva.detail} - ${nueva.datetime}`);

    // 🔹 GET: listar tareas después del POST
    console.log("\n🔄 Probando GET /tasks después del POST...");
    res = await axios.get(BASE_URL);
    console.log("✅ Tareas actuales:");
    res.data.forEach((task, i) => {
      console.log(`${i + 1}. ${task.title} - ${task.detail} - ${task.datetime}`);
    });

  } catch (err) {
    console.error("❌ Error en prueba:");
    console.error(err.response ? err.response.data : err.message);
  }
}

runTests();

