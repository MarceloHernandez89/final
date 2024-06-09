const conexionBD = require("../database/db");
//Manejo la operación crud para guardar los datos.
exports.save = async (req, res) => {
  try {
    const database = await conexionBD();
    const {
      nombre,
      bandera,
      mmsi,
      imo,
      call_sign,
      clase,
      subclase,
      medio_gc,
      latitud,
      longitud,
      detalle,
    } = req.body;
    await database.sql`INSERT INTO buques (nombre, bandera_id, mmsi, imo, call_sign, tipo_id, medio_gc_id, latitud, longitud, detalle)
                            VALUES 
                            (${nombre}, 
                            (SELECT id FROM banderas WHERE nombre = ${bandera}), 
                            ${mmsi}, 
                            ${imo}, 
                            ${call_sign}, 
                            (SELECT id FROM tipos WHERE clase = ${clase} AND subclase = ${subclase}), 
                            (SELECT id FROM medios_gc WHERE nombre = ${medio_gc}), 
                            ${latitud}, 
                            ${longitud}, 
                            ${detalle})`;
    res.redirect("/");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  } 
};

//Manejo la operación crud para actualizar los datos.
exports.update = async (req, res) => {
  try {
    const database = await conexionBD();
    const {
      id,
      nombre,
      bandera,
      mmsi,
      imo,
      call_sign,
      clase,
      subclase,
      medio_gc,
      latitud,
      longitud,
      detalle,
    } = req.body;
    await database.sql`UPDATE buques
                            SET 
                                nombre = ${nombre},
                                bandera_id = (SELECT id FROM banderas WHERE nombre = ${bandera}),
                                mmsi = ${mmsi},
                                imo = ${imo},
                                call_sign = ${call_sign},
                                tipo_id = (SELECT id FROM tipos WHERE clase = ${clase} AND subclase = ${subclase}),
                                medio_gc_id = (SELECT id FROM medios_gc WHERE nombre = ${medio_gc}),
                                latitud = ${latitud},
                                longitud = ${longitud},
                                detalle = ${detalle}
                            WHERE
                                id = ${id};`;
    res.redirect("/");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  } 
};