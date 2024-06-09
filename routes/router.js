//Instancio express
const express = require("express");
const router = express.Router();

//Requiero el modulo de base de datos.
const conexionBD = require("../database/db");

//Requiero el modulo crud.
const crud = require("../controllers/crud");

//Peticion GET para renderizar los datos en la plantilla pricipal index.ejs
router.get("/", async (req, res) => {
  try {
    const database = await conexionBD();
    let results = await database.sql`SELECT 
                                        buques.id, 
                                        buques.nombre, 
                                        banderas.nombre AS bandera, 
                                        buques.mmsi, 
                                        buques.imo, 
                                        buques.call_sign, 
                                        buques.latitud,
                                        buques.longitud
                                      FROM 
                                        buques
                                      JOIN 
                                        banderas ON buques.bandera_id = banderas.id;`;
    res.render("index", { results: results });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Peticion GET para hacer la carga de datos en la plantilla create.ejs (cargar registros)
router.get("/create", (req, res) => {
  res.render("create");
});

//Petición POST para ejecutar el modulo de la operación crud para guardar los nuevos registros cargados.
router.post("/save", crud.save);

//Peticion GET para renderizar los datos en la plantilla see.ejs (ver los registros) 
router.get("/see/:id", async (req, res) => {
  try {
    const database = await conexionBD();
    const id = req.params.id;
    let results = await database.sql`SELECT 
                                      buques.*, 
                                      banderas.nombre AS bandera,
                                      tipos.clase AS clase,
                                      tipos.subclase AS subclase,
                                      medios_gc.nombre AS gc 
                                    FROM 
                                      buques  
                                    JOIN 
                                      banderas ON buques.bandera_id = banderas.id
                                    JOIN
                                      tipos ON buques.tipo_id = tipos.id
                                    JOIN 
                                      medios_gc ON buques.medio_gc_id = medios_gc.id
                                    WHERE 
                                      buques.id = ${id};`;
    res.render("see", { buque: results[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Peticion GET para renderizar los datos en la plantilla edit.ejs (editar los registros) 
router.get("/edit/:id", async (req, res) => {
  try {
    const database = await conexionBD();
    const id = req.params.id;
    let results = await database.sql`SELECT 
                                        buques.*, 
                                        banderas.nombre AS bandera,
                                        tipos.clase AS clase,
                                        tipos.subclase AS subclase,
                                        medios_gc.nombre AS gc 
                                     FROM 
                                        buques  
                                     JOIN 
                                        banderas ON buques.bandera_id = banderas.id
                                     JOIN
                                        tipos ON buques.tipo_id = tipos.id
                                     JOIN 
                                        medios_gc ON buques.medio_gc_id = medios_gc.id
                                     WHERE 
                                        buques.id = ${id};`;
    res.render("edit", { buque: results[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Petición POST para ejecutar el modulo de la operación crud para editar los registros.
router.post("/update", crud.update);

//Peticion GET para eliminar los registros. 
router.get("/delete/:id", async (req, res) => {
  try {
    const database = await conexionBD();
    const id = req.params.id;
    await database.sql`DELETE FROM buques WHERE id = ${id}`;
    res.redirect("/");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Peticion GET para obtener los datos de buques incorporados al mapa leaflet (uso de AJAX). 
router.get("/buques", async (req, res) => {
  try {
    const database = await conexionBD();
    let results = await database.sql`SELECT 
                                        buques.id, 
                                        buques.nombre, 
                                        banderas.nombre AS bandera, 
                                        buques.mmsi, 
                                        buques.imo, 
                                        buques.call_sign, 
                                        buques.latitud,
                                        buques.longitud
                                      FROM 
                                        buques
                                      JOIN 
                                        banderas ON buques.bandera_id = banderas.id;`;
    res.json({ buques: results });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Exporto el modulo de rutas.
module.exports = router;
