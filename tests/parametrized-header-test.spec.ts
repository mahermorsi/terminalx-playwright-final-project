import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import { HeaderComponent } from '../logic/page object model/header-component';
import { Category } from '../logic/enums/categorise';
import urlJson from '../url.json';

test.describe('Header Buttons and Validate URL test', () => {
  let browser: BrowserWrapper;

  test.beforeEach(async () => {
    browser = new BrowserWrapper();
    await browser.createNewPage(HeaderComponent);
    await browser.navigateTo(urlJson.ui.url);
  });

  test.afterEach(async () => {
    await browser.closeBrowser();
  });

  const start = 0;
  const end = 10;
  const indexs = Array.from({ length: end - start + 1 }, (_, i) => ({ i: i + start }));

  indexs.forEach(({ i }) => {
    test(`choosing header number ${i} `, async () => {
      // Arrange
      const headerComponent: HeaderComponent = await browser.getCurrentPage();
      if (i > await headerComponent.getButtonsNumber()) { return }

      // Act
      const href = await headerComponent.ClickHeaderItemByIndex(i)

      // Assert
      expect(await headerComponent.waitForURLToBe(`${href}`)).toBeTruthy()
    });
  });
  for (const categorykey in Category) {
    if (isNaN(Number(categorykey))) {
      const category = Category[categorykey as keyof typeof Category];
      test(`searching for ${category} -> validate the shown filtered brands match the search request `, async () => {
        //Arrange
        const headerComponent: HeaderComponent = await browser.getCurrentPage();
        //Act
        await headerComponent.ClickOnCategory(category);
        //Assert
        expect(await headerComponent.waitForURLToBe(category.toLowerCase())).toBeTruthy()
        
      });
    }
  }
});