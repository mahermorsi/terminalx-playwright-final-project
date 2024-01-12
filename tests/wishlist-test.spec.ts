import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import urlJson from '../url.json'
import { WishListPage } from '../logic/page object model/wishlist-page';
import { ApiCalls } from '../logic/api/api-calls';

test.describe('wishlist products test', () => {
    let browserWrapper: BrowserWrapper;
    let wishPage: WishListPage;

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper();
        wishPage = await browserWrapper.createNewPage(WishListPage)
        await browserWrapper.navigateTo(urlJson.ui.wishListUrl)
    });
    test.afterEach(async () => {
        await browserWrapper.
            closeBrowser();
    })
    test("add 2 items -> validate they are added", async () => {
        // ARRANGE
        const apiCall=new ApiCalls();
        const items:string[]=["Z43370","Z43369"]

        // ACT
        const response =await apiCall.addItemsToWishlist(items)

        // ASSERT
        await browserWrapper.reloadPage()
        expect(await wishPage.getTotalCountOfItems()).toBe(2)

    })
})