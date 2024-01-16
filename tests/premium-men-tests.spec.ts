import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import urlJson from '../url.json'
import { PremiumPage } from '../logic/page object model/premium-page';

test.describe('Premium Men Page tests', () => {
    let browserWrapper: BrowserWrapper;
    let premiumPage: PremiumPage;

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper();
        premiumPage = await browserWrapper.createNewPage(PremiumPage)
        await browserWrapper.navigateTo(urlJson.ui.premiumMenUrl)
    });
    test.afterEach(async () => {
        await browserWrapper.
            closeBrowser();
    })
    test('In men premium page "/premium/men" - >  filter price by cheapest to most expensive - > validate first 10 products prices are sorted from low to high', async () => {
        
        //Act
        await premiumPage.filterPriceByCheapestToMostExpensive()

        //Assert
        expect(await premiumPage.validateFirst_10_ProductsPricesAreSortedFromLowToHigh()).toBeTruthy()
    })
    test('In /premium/men page - > filter products by BLACK color -> validate first 10 products are black colored', async () => {

        //Act
         await premiumPage.filterProductsByBLACKColor()

         //Assert
         expect(await premiumPage.validateFirst10ProductsAreBlackColored()).toBeTruthy()
     })
})