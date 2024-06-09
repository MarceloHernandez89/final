// src/app.js
const express = require("express");
const app = express();
const engine = require("ejs");
const path = require("path");

// Configuración de la carpeta pública
app.use(express.static(path.join(__dirname, "public")));

// Configuración del motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para analizar solicitudes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Usar el enrutador
const router = require("./routes/router");
app.use("/", router);

// Iniciar el servidor
app.listen(5000, () => {
  console.log("Servidor escuchando en puerto 5000");
});
