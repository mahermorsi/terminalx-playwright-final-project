import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import urlJson from '../url.json'
import { MainPage } from '../logic/page object model/main-page';
import { delay } from '../utils/wait-for-elements';

test.describe('living test', () => {
    let browserWrapper: BrowserWrapper;
    let mainPage: MainPage;
    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper();
       
    });
    test.afterEach(async () => {
        await browserWrapper.
            closeBrowser();
    })
   test("Hover on Living, click on עיצוב הבית and validate that we are navigated to the right page ", async () => {
        //Arrange 
        mainPage = await browserWrapper.createNewPage(MainPage)
        await browserWrapper.navigateTo(urlJson.ui.url)
        //Act
      await mainPage.HoverAndClickHomedecorButton()
        //Assert
        expect( (await mainPage.waitForURLToBe("https://www.terminalx.com/home-lifestyle/home-design"))).toBeTruthy()
})
});