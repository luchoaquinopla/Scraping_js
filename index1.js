import puppeteer from 'puppeteer';

async function extraerProductos() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100
    });

    const page = await browser.newPage();
    await page.goto('https://www.mercadolibre.com.ar/');

    await page.waitForSelector('input[name="as_word"]');
    await page.type('input[name="as_word"]', 'iphone 12 128gb');
    await page.keyboard.press('Enter');

    await page.waitForNavigation();
    await page.waitForSelector('a[href*="applied_filter_name%3DColor+principal"][href*="applied_value_name%3DBlanco"]');
    await page.click('a[href*="applied_filter_name%3DColor+principal"][href*="applied_value_name%3DBlanco"]');

    await page.waitForSelector('.ui-search-result__wrapper');
    const productElement = await page.$('.ui-search-result__wrapper');
    if (productElement) {
        await productElement.click();
    }

    await page.waitForNavigation();

    // Extrae la información del producto en Mercado Libre
    const product = await page.evaluate(() => {
        const title = document.querySelector('h1')?.innerText || 'No title';
        const price = document.querySelector('.andes-money-amount__fraction')?.innerText || 'No price';
        const imageUrl = document.querySelector('.ui-pdp-gallery__figure img')?.src || 'No image URL';

        return { title, price, imageUrl };
    });

    // Va a la segunda página y espera que cargue lo necesario
    await page.goto('https://todoapplecaba.com.ar/producto/iphone-12-128-gb/', { waitUntil: 'domcontentloaded' });

    // Extrae la información del producto en Todo Apple
    const product2 = await page.evaluate(() => {
        const title = document.querySelector('h1')?.innerText || 'No title';
        const price = document.querySelector('.price')?.innerText || 'No price';
        const imageUrl = document.querySelector('.wp-post-image')?.src || 'No image URL';

        return { title, price, imageUrl };
    });

    console.log(product, product2);

    await browser.close();
}

extraerProductos();
