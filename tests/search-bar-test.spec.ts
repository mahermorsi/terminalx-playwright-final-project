import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/generic-browser-wrapper';
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
  const Products = [
    { value: "JEANS" },
    { value: "TSHIRT" },
    { value: "HAT" }
  ];
  Products.forEach(({ value }) => {
  test(`searching about ${value} `,  async () => {
    //Arrange
    const mainPage = await browser.createNewPage(MainPage);
    await browser.navigateTo(urlJson.url)
    //Act
    await mainPage.fillSearchInput(value)
    //Assert
     expect((await browser.getPage()).url()).toContain(value);

  });

});
});
