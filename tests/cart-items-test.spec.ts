import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import { MainPage } from '../logic/page object model/main-page';
import urlJson from '../url.json'
import { ApiCalls } from '../logic/api/api-calls';
import { cartItems } from '../logic/enums/cart-items';
import { wrapCartBodyResponse } from '../logic/api/body-responses/cart-items-body-response';
import { CheckoutPage } from '../logic/page object model/cart-checkout-page';
test.describe.serial('cart items test',() => {
  let browser: BrowserWrapper;
  let apiCall: ApiCalls;
  let checkoutPage:CheckoutPage
 
  test.beforeEach(async () => {
    browser = new BrowserWrapper();
    apiCall = new ApiCalls();
  })
  test.afterEach(async () => {
    await browser.navigateTo(urlJson.ui.cartUrl)
    await checkoutPage.deleteAllItems();
    await browser.closeBrowser();
  })

  test(`In checkout page -> add 3 items to cart -> validate 3 items are shown`,  async () => {
    //ARRANGE
    checkoutPage = await browser.createNewPage(CheckoutPage)
    await browser.navigateTo(urlJson.ui.cartUrl)

    // ACT
    await apiCall.addItemToCart(cartItems.blackShoes);
    await apiCall.addItemToCart(cartItems.redTshirt);
    const response = await wrapCartBodyResponse(await apiCall.addItemToCart(cartItems.whiteHat));

    //ASSERT
    await checkoutPage.refreshPage();
    expect(await checkoutPage.getItemsCount()).toBe(response?.data.addAnyProductsToAnyCart.total_quantity)

  });
  
  test(`Add HAT to cart -> Navigate to checkout page ->  check if checkout title appears`,  async () => {
    //Arrange
    const mainPage = await browser.createNewPage(MainPage);
    await browser.navigateTo(urlJson.ui.url)
    await mainPage.fillSearchInput("HAT")
    //Act
    checkoutPage = await browser.createNewPage(CheckoutPage);
    await checkoutPage.AddItemToCart();
    await checkoutPage.GoToCheckout()
    //Assert
    expect(await checkoutPage.TitleIsVisible()).toBeTruthy()
  });

});
