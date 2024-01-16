import { test, expect } from '@playwright/test';
import teardown from '@playwright/test'
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import urlJson from '../url.json'
import { AccountPage } from '../logic/page object model/account-page';

teardown.describe('logout test', () => {
    let browserWrapper: BrowserWrapper;

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper();
        await browserWrapper.createNewPage(AccountPage)
        await browserWrapper.navigateTo(urlJson.ui.accountUrl)

    });
    test.afterEach(async () => {
        await browserWrapper.closeBrowser();
    })
    test("click logout -> validate user has logged out ", async () => {
        //Arrange 
        const accountPage: AccountPage = await browserWrapper.getCurrentPage();
        //Act
        await accountPage.clickLogout();
        //Assert
        expect(await accountPage.checkLoggedOut()).toBeTruthy()
    })
});