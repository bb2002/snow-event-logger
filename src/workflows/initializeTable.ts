import { Connection } from 'mysql2/promise';

async function initializeTable(connection: Connection, itemId: string) {
  try {
    await connection.query(`DESC item_${itemId}`);
  } catch (ex) {
    await connection.query(`
        CREATE TABLE item_${itemId} (_id INT NOT NULL AUTO_INCREMENT, remain_cnt INT NOT NULL, created_at DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY (_id) );
    `);
  }
}

export default initializeTable;
