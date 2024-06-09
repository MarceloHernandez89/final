//Conexion con la base de datos.
const { Database } = require("@sqlitecloud/drivers");

async function conexionBD() {
  try {
    const database = new Database(
      "sqlitecloud://ckixh0sysz.sqlite.cloud:8860?apikey=ZmGxOu1a9Kgsg7kG6bsT6bkak13n3VxKZBVWvZpO9fw"
    );
    let dbName = "srbi_db";
    await database.sql`USE DATABASE ${dbName}`;
    return database;
  } catch (error) {
    throw new Error("Error al intentar conectar a la base de datos:", error);
  }
}

module.exports = conexionBD;