import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import urlJson from '../url.json'
import { BrandsPage } from '../logic/page object model/brands-page';
import { Brand } from '../logic/enums/brands';

test.describe('Parameterized test to check the functionality of brand filtering searchbar', () => {
  let browser: BrowserWrapper;

  test.beforeEach(async () => {
    browser = new BrowserWrapper();
    await browser.createNewPage(BrandsPage)
    await browser.navigateTo(urlJson.ui.brandsUrl)
  })

  test.afterEach(async () => {
    await browser.closeBrowser();
  })

  for (const brandKey in Brand) {
    if (isNaN(Number(brandKey))) {
      const brand = Brand[brandKey as keyof typeof Brand];
      test(`searching for ${brand} -> validate the shown filtered brands match the search request `, async () => {
        //Arrange
        const brandsPage: BrandsPage = await browser.getCurrentPage();

        //Act
        await brandsPage.fillInBrand(brand)

        //Assert
        expect(await brandsPage.areFilteredBrandsMatchSearchInput(brand)).toBeTruthy();
      });
    }
  }
});

