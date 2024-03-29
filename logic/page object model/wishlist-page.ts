import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/utils';

export class WishListPage extends BasePage{
    private readonly itemsList: Locator

    constructor(page: Page){
        super(page)
        this.initPage();
        this.itemsList=this.page.locator('//li[@class="wishlist-product_2rk-"]')
    }
    
    async getTotalCountOfItems(){
        await this.refreshPage()
        const result = await waitForElementToBeVisible(this.itemsList.first())
        if (!result) {throw new Error("Locator isn't visible")}
        return await this.itemsList.count()
    }
}