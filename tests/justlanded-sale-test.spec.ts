import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import urlJson from '../url.json'
import { JustLandedPage } from '../logic/page object model/just-landed-page';
import { SalePercentages } from '../logic/enums/sale-percentages';

test.describe('sales filter functionality in justlanded page', () => {
    let browserWrapper: BrowserWrapper;

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper();
        await browserWrapper.createNewPage(JustLandedPage)
        await browserWrapper.navigateTo(urlJson.ui.justLandedUrl)
    });
    test.afterEach(async () => {
        await browserWrapper.closeBrowser();
    })

    const salePercentages: string[] = Object.values(SalePercentages);
    salePercentages.forEach((salePercentage) => {
        test(`In JustLanded page -> Click on מבצע and choose ${salePercentage} -> Validate all products have ${salePercentage} sale and final price matches the sale`, async () => {
            // ARRANGE
            const justLandedPage:JustLandedPage = await browserWrapper.getCurrentPage();

            // ACT
            await justLandedPage.chooseSaleType(salePercentage);

            // ASSERT
            expect(await justLandedPage.isSaleAndFinalPriceMatchesSale(salePercentage)).toBeTruthy();
        });
    });
    test('In JustLanded page -> vallidate all items have justLanded stampa' , async () => {
        // ARRANGE
        const justLandedPage:JustLandedPage = await browserWrapper.getCurrentPage();
        const stampaText="JUST LANDED"
        // ASSERT
        expect(await justLandedPage.doItemsHaveStampa(stampaText)).toBeTruthy();
    });
});