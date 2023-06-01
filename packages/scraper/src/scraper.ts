import puppeteer from "puppeteer";
import * as fs from "fs";

interface Listing {
  title: string;
  area: string;
  noOfRooms: string;
  surface: string;
  floor: string;
  subdivision: string;
  price: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0"
  );

  const listings: Partial<Listing>[] = [];

  for (let nr_pag = 1; nr_pag < 3; nr_pag++) {
    await page.goto(
      `https://www.imobiliare.ro/inchirieri-apartamente/bucuresti?pagina=${nr_pag}`
    );

    const currentPageListings = await page.evaluate(() => {
      const listing = document.querySelectorAll(".box-anunt");

      const listingsArray = Array.from(listing);
      return listingsArray.map((el) => {
        const title =
          el.querySelector(".titlu-anunt > span")?.textContent ?? undefined;
        const area =
          el
            .querySelector(".localizare > div > p > span")
            ?.textContent?.trim() ?? undefined;
        const props = el.querySelectorAll(".caracteristica > span ");
        const propsArray = Array.from(props);
        const propsText = propsArray.map((el) => el.textContent);
        const price = el.querySelector(".pret-mare")?.textContent ?? undefined;
        return {
          title,
          area,
          noOfRooms: propsText[0],
          surface: propsText[1],
          floor: propsText[2],
          subdivision: propsText[3],
          price,
        } as Listing;
      });
    });
    listings.push(...currentPageListings);
    await sleep(5000);
  }

  fs.writeFileSync("../../scrapedData.json", JSON.stringify(listings), "utf-8");
  await browser.close();
})();
