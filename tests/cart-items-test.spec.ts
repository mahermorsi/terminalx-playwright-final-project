import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import { MainPage } from '../logic/page object model/main-page';
import urlJson from '../url.json'
import { ApiCalls } from '../logic/api/api-calls';
import { cartItems } from '../logic/enums/cart-items';
import { wrapCartBodyResponse } from '../logic/api/body-responses/cart-items-body-response';
import { CheckoutPage } from '../logic/page object model/cart-checkout-page';

test.describe.serial('cart items test', () => {

  let browser: BrowserWrapper;

  test.beforeEach(async () => {
    browser = new BrowserWrapper();
    await browser.createNewPage(CheckoutPage)
    await browser.navigateTo(urlJson.ui.cartUrl)
  })

  test.afterEach(async () => {
    const checkoutPage: CheckoutPage = await browser.getCurrentPage();
    await checkoutPage.deleteAllItems();
    await browser.closeBrowser();
  })

  test(`In checkout page -> add 3 items to cart -> validate 3 items are shown`, async () => {
    //ARRANGE
    const apiCall = new ApiCalls();

    // ACT
    await apiCall.addItemToCart(cartItems.blackShoes);
    await apiCall.addItemToCart(cartItems.redTshirt);
    const response = await wrapCartBodyResponse(await apiCall.addItemToCart(cartItems.whiteHat));

    //ASSERT
    const checkoutPage: CheckoutPage = await browser.getCurrentPage();
    expect(await checkoutPage.getItemsCount()).toBe(response?.data.addAnyProductsToAnyCart.total_quantity)

  });
  test(`In checkout page -> add 2 items to cart -> validate the sum of each price is equal to the total cart checkout price `, async () => {
    //ARRANGE
    const apiCall = new ApiCalls();

    // ACT
    await apiCall.addItemToCart(cartItems.blackShoes);
    await apiCall.addItemToCart(cartItems.redTshirt);

    //ASSERT
    const checkoutPage: CheckoutPage = await browser.getCurrentPage();
    expect((await checkoutPage.getTotalSum()).toFixed(2)).toBe((await checkoutPage.sumUpAllProducts()).toFixed(2))
  });


  test(`Add HAT to cart -> Navigate to checkout page ->  Verify the item is added to the checkout page`, async () => {
    //Arrange
    await browser.navigateTo(urlJson.ui.url)
    const mainPage: MainPage = await browser.createNewPage(MainPage)
    const product = "HAT"
    await mainPage.fillSearchInput(product)
    const checkoutPage: CheckoutPage = await browser.createNewPage(CheckoutPage)

    //Act
    const itemText = await checkoutPage.addItemToCart();
    await browser.navigateTo(urlJson.ui.cartUrl)

    //Assert
    expect(await checkoutPage.itemIsVisible(itemText)).toBeTruthy()
  });

});
