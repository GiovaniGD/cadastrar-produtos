const mysql = require('mysql2/promise');

async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'cadastroprodutos'
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
    console.log('Query executada');
    return rows;
  } catch (error) {
      console.error('Falha em executar query');
      throw error;
  } finally {
    if (connection) {
        connection.end();
        console.log('Banco de dados desconectado');
    }
  }
}

module.exports = {query};