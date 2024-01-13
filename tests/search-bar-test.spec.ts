import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import { MainPage } from '../logic/page object model/main-page';
import urlJson from '../url.json'
test.describe('Parametrized Products Search test',() => {
  let browser: BrowserWrapper;
 
  test.beforeEach(async () => {
    browser = new BrowserWrapper();
  })
  test.afterAll(async () => {
    await browser.closeBrowser();
  })
  const Brands = [
    { brand: "PUMA" },
    { brand: "NIKE" },
    { brand: "NAUTICA" }
  ];
  Brands.forEach(({ brand }) => {
  test(`searching about ${brand} `,  async () => {
    //Arrange
    test.slow()
    const mainPage = await browser.createNewPage(MainPage);
    await browser.navigateTo(urlJson.ui.url)
    //Act
    await mainPage.fillSearchInput(brand)
    //Assert
    expect(await mainPage.CheckBrandNameInFirstThreeItems(brand)).toBeTruthy();
    });
  });
});
