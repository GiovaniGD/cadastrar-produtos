const mysql = require('mysql2/promise');

async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: 'sql10.freemysqlhosting.net',
      user: 'sql10645444',
      password: 'n2NXTbvGmV',
      database: 'sql10645444'
    });

    console.log('Banco de dados conectado');
    return connection;
  } catch (error) {
    console.error('Falha em conectar banco de dados');
    throw error;
  }
}

async function query(sql) {
  const connection = await connect();
  try {
    const [rows] = await connection.execute(sql);
    return rows;
  } catch (error) {
      throw error;
  } finally {
    if (connection) {
        connection.end();
        console.log('Banco de dados desconectado');
    }
  }
}

module.exports = {query};