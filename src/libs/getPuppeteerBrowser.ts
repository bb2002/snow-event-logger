import puppeteer, { Browser, Page } from 'puppeteer';

interface GetPuppeteerBrowserReturn {
  browser: Browser;
  page: Page;
}

async function getPuppeteerBrowser(
  url: string,
): Promise<GetPuppeteerBrowserReturn> {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  await page.goto(url);

  return {
    browser,
    page,
  };
}

export default getPuppeteerBrowser;
