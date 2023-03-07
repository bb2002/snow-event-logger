import * as dotenv from 'dotenv';
import { format } from 'date-fns';
import getPuppeteerBrowser from './libs/getPuppeteerBrowser';
import getRemainCount from './workflows/getRemainCount';
import getMySQLConnection from './libs/getMySQLConnection';
import initializeTable from './workflows/initializeTable';
import getLastSnowEventItemLog from './workflows/getLastSnowEventItemLog';
import insertSnowEventLog from './workflows/insertSnowEventLog';

dotenv.config();

const { EVENT_ITEM_URL } = process.env;

async function bootstrap() {
  console.log('====== Start logging ======');
  const eventItemUrl = new URL(EVENT_ITEM_URL as string);
  const eventItemPathSplit = eventItemUrl.pathname.split('/');
  const eventItemId = eventItemPathSplit[eventItemPathSplit.length - 1];
  console.log(`[ OK ] EVENT_ITEM_URL=${EVENT_ITEM_URL}`);

  const { connection, DB_HOST, DB_USER, DB_NAME, DB_PORT } =
    await getMySQLConnection();
  console.log(`[ OK ] DATABASE=${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

  await initializeTable(connection, eventItemId);
  console.log(`[ OK ] ITEM_ID=${eventItemId}`);

  const { page, browser } = await getPuppeteerBrowser(EVENT_ITEM_URL as string);

  for (;;) {
    const remainCount = await getRemainCount(page);
    const lastSnowEventItemLog = await getLastSnowEventItemLog(
      connection,
      eventItemId,
    );

    if (
      (lastSnowEventItemLog === null ||
        lastSnowEventItemLog.remainCount !== remainCount) &&
      remainCount !== null
    ) {
      // 응모 등 경품 숫자가 줄어든 경우
      await insertSnowEventLog(connection, eventItemId, remainCount);
    }

    console.log(
      `[LOG] ${lastSnowEventItemLog?.remainCount} at ${
        lastSnowEventItemLog
          ? format(lastSnowEventItemLog.createdAt, 'yyyy-MM-dd HH:mm:ss')
          : 'Unknown'
      } -> ${remainCount} at ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
    );

    if (remainCount === 0) {
      break;
    }

    await page.reload();
    await page.waitForTimeout(30000);
  }

  connection.destroy();
  await browser.close();
  console.log('Product is sold out. Stop logging.');
}

bootstrap();
