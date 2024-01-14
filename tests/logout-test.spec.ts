import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import urlJson from '../url.json'
import { AccountPage } from '../logic/page object model/account-page';

test.describe.skip('logout test', () => {
    let browserWrapper: BrowserWrapper;
   
    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper();
       
    });
    test.afterEach(async () => {
        await browserWrapper.
            closeBrowser();
    })
    test("click logout and validate we logout", async () => {
        //Arrange 
        const accountPage = await browserWrapper.createNewPage(AccountPage)
        await browserWrapper.navigateTo(urlJson.ui.accountUrl)
        //Act
        await accountPage.clickLogout();
        //Assert
        expect(await accountPage.checkLoggedOut()).toBeTruthy()
})
});