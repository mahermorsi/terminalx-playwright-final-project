import { test, expect } from '@playwright/test';
import { chromium, Browser, Page } from 'playwright';
import { BrowserWrapper } from '../infra/generic-browser-wrapper';
import { MainPage } from '../logic/MainPage';
import { url } from '../config.json';
test.describe('Parametrized Products Search test',() => {
  let browser: BrowserWrapper;
  let mainPage: MainPage;
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
    mainPage = await browser.createNewPage(MainPage);
    await browser.navigateTo(url)
    //Act
    await mainPage.fillSearchInput(value)
    //Assert
     expect((await browser.getPage()).url()).toContain(value);

  });

});
});
