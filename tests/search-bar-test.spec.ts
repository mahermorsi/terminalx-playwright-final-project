import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import { MainPage } from '../logic/page object model/main-page';
import urlJson from '../url.json'
import { Brand } from '../logic/enums/brands';

test.describe('Parametrized Products Search test',() => {
    let browser: BrowserWrapper;
  
    test.beforeEach(async () => {
      browser = new BrowserWrapper();
    })
    
    test.afterEach(async () => {
      await browser.closeBrowser();
    })

    for (const brandKey in Brand) {
      if (isNaN(Number(brandKey))) {
          const brand = Brand[brandKey as keyof typeof Brand];
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
    }
    }
  });
