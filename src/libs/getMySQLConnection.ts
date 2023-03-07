import mysql from 'mysql2/promise';

async function getMySQLConnection() {
  const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST || 'localhost',
    user: DB_USER || 'root',
    password: DB_PASS || '',
    database: DB_NAME || 'snow_event_logger',
    port: Number(DB_PORT || 3306),
  });

  await connection.query('SELECT 1');
  return {
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PORT,
    connection,
  };
}

export default getMySQLConnection;
