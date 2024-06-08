// src/controllers/crud.js
const conexionBD = require('../database/db');

exports.save = async (req, res) => {
    try {
        const database = await conexionBD();
        const { nombre, bandera, mmsi, imo } = req.body;
        await database.sql`INSERT INTO buques (nombre, bandera, mmsi, imo) VALUES (${nombre}, ${bandera}, ${mmsi}, ${imo})`;
        res.redirect('/');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

exports.update = async (req, res) => {
    try {
        const database = await conexionBD();
        const { id, nombre, bandera, mmsi, imo } = req.body;
        await database.sql`UPDATE buques SET nombre = ${nombre}, bandera = ${bandera}, mmsi = ${mmsi}, imo = ${imo} WHERE id = ${id}`;
        res.redirect('/');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


