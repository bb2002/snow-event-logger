import { Connection } from 'mysql2/promise';

interface SnowEventLog {
  _id: number;
  remainCount: number;
  createdAt: Date;
}

async function getLastSnowEventItemLog(
  connection: Connection,
  itemId: string,
): Promise<SnowEventLog | null> {
  const [rows] = await connection.execute(
    `SELECT * FROM item_${itemId} ORDER BY _id DESC LIMIT 1`,
  );

  const row = (rows as any[])[0];
  if (!row) {
    return null;
  }

  return {
    _id: row._id,
    remainCount: row.remain_cnt,
    createdAt: row.created_at,
  };
}

export default getLastSnowEventItemLog;
