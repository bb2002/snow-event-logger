import { Page } from 'puppeteer';

async function getRemainCount(page: Page): Promise<number | null> {
  try {
    await page.waitForSelector(
      '#content > div.main-container > div.reward-item-view.clear-after > div.reward-info > div.meta > span.quantity',
    );

    const element = await page.$(
      '#content > div.main-container > div.reward-item-view.clear-after > div.reward-info > div.meta > span.quantity',
    );
    const value = (await page.evaluate(
      el => el?.textContent,
      element,
    )) as string;

    return parseInt(value.split('/')[0], 10);
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export default getRemainCount;
