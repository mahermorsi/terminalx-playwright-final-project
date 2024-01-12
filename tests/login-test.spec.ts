import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import urlJson from '../url.json'
import { MainPage } from '../logic/page object model/main-page';

test.describe('login test', () => {
    let browserWrapper: BrowserWrapper;
    let mainPage: MainPage;

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper();
        mainPage = await browserWrapper.createNewPage(MainPage)
        await browserWrapper.navigateTo(urlJson.ui.url)
    });
    test.afterEach(async () => {
        await browserWrapper.
            closeBrowser();
    })
    test("check username to validate a successful login", async () => {
        expect(await mainPage.isGreetingShown()).toBeTruthy()
    })
})