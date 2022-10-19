import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

// Enable response interception
page.on('response', async (response) => {
    console.info(`${response.request().method()}: ${response.request().url()}`)
    // Use this to get the content as text
    // const responseText = await response.text();
    // ... or as buffer (for binary data)
    // const responseBuffer = await response.buffer();
    // ... or as JSON, if it's a JSON (else, this will throw!)
    // const responseObj = await response.json();

    // console.log(responseText)
})
// await page.goto('https://techoverflow.net', { waitUntil: 'domcontentloaded' });
await page.goto('https://www.gtt.to.it/cms/percorari/urbano?view=percorsi&bacino=U&linea=10N');

await browser.close();