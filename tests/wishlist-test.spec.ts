import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import urlJson from '../url.json'
import { WishListPage } from '../logic/page object model/wishlist-page';
import { ApiCalls } from '../logic/api/api-calls';
import { wishListItems } from '../logic/enums/wishlist-items';
import { WishlistResponse, wrapWishlistResponse } from '../logic/api/body-responses/wishlist-response-body';
import { getListOfWishlistItemsID } from '../utils/utils';

test.describe('wishlist products test', () => {
    let browserWrapper: BrowserWrapper;
    let wrappedResponse: WishlistResponse;

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper();
        await browserWrapper.createNewPage(WishListPage)
        await browserWrapper.navigateTo(urlJson.ui.wishListUrl)
    });
    test.afterEach(async () => {
        const list = getListOfWishlistItemsID(wrappedResponse)
        const apiCall = new ApiCalls();
        await apiCall.removeAllitemsFromWishList(list)
        await browserWrapper.
            closeBrowser();
    })
    test("add 2 items -> validate they are added", async () => {
        // ARRANGE
        const items: string[] = [wishListItems.batmanTshirt, wishListItems.dinasourTshirt]
        const apiCall = new ApiCalls();

        // ACT
        const response = await apiCall.addItemsToWishlist(items)
        wrappedResponse = await wrapWishlistResponse(response)

        // ASSERT
        const wishPage: WishListPage = await browserWrapper.getCurrentPage();
        expect(await wishPage.getTotalCountOfItems()).toBe(wrappedResponse?.data.addProductsToWishlist.anyWishlist.items_count)
    })
})