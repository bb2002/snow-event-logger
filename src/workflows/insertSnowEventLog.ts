import { Connection } from 'mysql2/promise';

async function insertSnowEventLog(
  connection: Connection,
  itemId: string,
  remainCount: number,
) {
  await connection.query(
    `INSERT INTO item_${itemId} (remain_cnt) VALUES(${remainCount})`,
  );
}

export default insertSnowEventLog;
