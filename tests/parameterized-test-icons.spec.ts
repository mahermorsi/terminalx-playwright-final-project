import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import { FollowUsComponent } from '../logic/page object model/follow-us-component';
import urlJson from '../url.json';

test.describe('Icons Navigation Validate URL test', () => {
  let browser: BrowserWrapper;

  test.beforeEach(async () => {
    browser = new BrowserWrapper();
  });

  test.afterEach(async () => {
    await browser.closeBrowser();
  });
  
  const Icons = [
    { icon: "Instagram", i:0 },
    { icon: "Facebook" , i:1 },
    { icon: "Youtube" ,i:2},
    { icon: "Tiktok" ,i:3}
  ];

  Icons.forEach(({ icon,i }) => {
    test(`choosing ${icon} Social Media Website`, async () => {
      
      // Arrange
      const followUsComponent = await browser.createNewPage(FollowUsComponent);
      await browser.navigateTo(urlJson.ui.url);
      if(i>await followUsComponent.getIconsNumber()){return}
      
      // Act
      const href=await followUsComponent.getHrefByIndex(i)
      
      // Assert
      await followUsComponent.ClickIconByIndex(i)
      expect(await followUsComponent.waitForURLToBe(`${href}`)).toBeTruthy()
    });
  });
});