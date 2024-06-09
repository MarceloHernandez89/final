// src/routes/router.js
const express = require("express");
const router = express.Router();
const conexionBD = require("../database/db");

// Ruta a crud.js
const crud = require("../controllers/crud");

// get de prueba con la base de datos...
router.get("/", async (req, res) => {
  try {
    const database = await conexionBD();
    let results = await database.sql`SELECT 
                                            buques.id, 
                                            buques.nombre, 
                                            banderas.nombre AS bandera, 
                                            buques.mmsi, 
                                            buques.imo, 
                                            buques.call_sign 
                                        FROM 
                                            buques
                                        JOIN 
                                            banderas ON buques.bandera_id = banderas.id;
                                        `;
    res.render("index", { results: results });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get("/create", (req, res) => {
  res.render("create");
});

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
                                        buques.id = ${id};
                                    `;
    res.render("see", { buque: results[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

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
                                        buques.id = ${id};
                                    `;
    console.log(results);
    res.render("edit", { buque: results[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

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

router.post("/save", crud.save);
router.post("/update", crud.update);

module.exports = router;
