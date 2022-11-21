const express = require('express');
const cors = require('cors');
const { PlaywrightCrawler, Dataset } = require('crawlee');

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const app = express();

app.use(cors());
app.options('*', cors());

//Middlewares
app.use(express.json());

const scanSite = async () => {
  // PlaywrightCrawler crawls the web using a headless
  // browser controlled by the Playwright library.
  const crawler = new PlaywrightCrawler({
    async requestHandler({ request, page, enqueueLinks, log }) {
      console.log('===================== here here 3');
      const title = await page.title();
      console.log('===================== here here 4');
      log.info(`Title of ${request.loadedUrl} is '${title}'`);
      console.log('===================== here here 5');
      await Dataset.pushData({ title, url: request.loadedUrl });
      console.log('===================== here here 6');
      await enqueueLinks();
      console.log('===================== here here 7');
    },
    // When you turn off headless mode, the crawler
    // will run with a visible browser window.
    headless: false
  });

  // Add first URL to the queue and start the crawl.
  console.log('===================== here here 1');
  await crawler.run(['http://crawlee.dev']);
  console.log('===================== here here 2');
};

scanSite();

app.get(
  '/',
  asyncMiddleware(async (req, res) => {
    console.log('============here 1');
    await scanSite();
    console.log('============here 2');
    res.send('Hello World!');
    console.log('============here 3');
  })
);

app.listen(3100, () => {
  console.log('Server running at port 3100');
});
