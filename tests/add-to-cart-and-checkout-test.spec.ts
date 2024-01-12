import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import { MainPage } from '../logic/page object model/main-page';
import { AddItemToCart } from '../logic/page object model/cart-page';
import urlJson from '../url.json'
test.describe('Add Item ToCart and checkout',() => {
  let browser: BrowserWrapper;
 
  test.beforeEach(async () => {
    browser = new BrowserWrapper();
  })
  test.afterAll(async () => {
    await browser.closeBrowser();
  })
  test(`Add Item ToCart and checkout`,  async () => {
    //Arrange
    const mainPage = await browser.createNewPage(MainPage);
    await browser.navigateTo(urlJson.url)
    await mainPage.fillSearchInput("HAT")
    //Act
    const addItemToCart = await browser.createNewPage(AddItemToCart);
    await addItemToCart.AddItemToCart();
    await addItemToCart.GoToCheckout()
    //Assert
    expect(await addItemToCart.TitleIsVisible()).toBeTruthy()
  });

});
