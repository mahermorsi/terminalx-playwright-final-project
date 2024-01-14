import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import { HeaderComponent } from '../logic/page object model/header-component';
import urlJson from '../url.json';

test.describe('Header Buttons and Validate URL test', () => {
  let browser: BrowserWrapper;

  test.beforeEach(async () => {
    browser = new BrowserWrapper();
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
      test.slow();
      const headerComponent = await browser.createNewPage(HeaderComponent);
      await browser.navigateTo(urlJson.ui.url);
      if(i>await headerComponent.getButtonsNumber()){return}

      // Act
      await headerComponent.ClickHeaderItemByIndex(i)
      

      // Assert
      const href=await headerComponent.getHrefByIndex(i)
      expect(await headerComponent.waitForURLToBe(`${href}`)).toBeTruthy()
    });
  });
});