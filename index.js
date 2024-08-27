import puppeteer from 'puppeteer';

async function openWebPage(){
//este metodo sirve para inicializar pupperter y nos dara un objeto llamado browser que es un navegador
const browser = await puppeteer.launch({
    headless: false, //headless al tomar el valor de false nos mostrara todas las acciones que ejecuta abriendo una ventana del navegador
    slowMo:200
})
// newPage() lo que va hacer es abrir una nueva pagina dentro del navegador
const page = await browser.newPage()
await page.goto('https://www.mercadolibre.com.ar/')
await browser.close()
}
async function captureScreenshot(){
   
    const browser = await puppeteer.launch({
        headless: false, 
        slowMo:200
    })

    const page = await browser.newPage()
    
    await page.goto('https://www.mercadolibre.com.ar/')
    await page.screenshot({path: 'example.png'})
    await browser.close()
    }
async function clickOnPage(){
   
    const browser = await puppeteer.launch({
        headless: false, 
        slowMo:400
    })

    const page = await browser.newPage()
    
    await page.goto('https://quotes.toscrape.com/')
    await page.click('a[href="/login"]')
    await new Promise(r => setTimeout(r,5000));
    await browser.close()
    }
async function getDataFromWebPage(){
   
    const browser = await puppeteer.launch({
        headless: false, 
        slowMo:400
    })

    const page = await browser.newPage()
    
    await page.goto('https://www.mercadolibre.com.ar/')
    
    const result = await page.evaluate(()=>{
       const tittle = document.querySelector('h1').innerText
      return {
        tittle
       }
    })
    console.log(result)
    await browser.close()
    }
    
//openWebPage()
//captureScreenshot()
//clickOnPage()
getDataFromWebPage()

