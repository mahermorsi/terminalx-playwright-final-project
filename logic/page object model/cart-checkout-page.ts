import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';
export class CheckoutPage extends BasePage{
    // LOCATORS
    private readonly listItems: Locator
    private readonly deleteButtons: Locator
    private readonly addToCartButton: Locator
    private readonly listCartItems: Locator
    private readonly checkoutButton: Locator
    private readonly checkoutIcon: Locator
    private readonly checkoutTitle: Locator

    constructor(page: Page){
        super(page);
        this.listCartItems = this.page.locator('//div[@class="cart-items-list_wmqo"]/div')
        this.addToCartButton=this.page.locator('//button[text()="הוספה לסל"]')
        this.listItems = this.page.locator('//ol[@class="product-list_yyTm"]')
        this.checkoutIcon= this.page.locator("//a[@href='/checkout/cart']")
        this.checkoutButton= this.page.locator("//a[@href='/checkout']")
        this.checkoutTitle = this.page.locator("//div[text()='Check out']")
        this.deleteButtons = this.page.locator('//div[@class="cart-items-list_wmqo"]/div//button[@class="tx-link-a icon_u36n remove_wqPe tx-link_29YD"]')
        this.initPage();
    }
    async getItemsCount(){
        const result = await waitForElementToBeVisible(this.listCartItems.first())
        if (!result) {throw new Error("Locator isn't visible")}
        return await this.listCartItems.count()
    }
    async deleteAllItems(){
        const result = await waitForElementToBeVisible(this.listCartItems.first(),500,5)
        if (!result) {return "Nothing to delete"}
        const itemsCount = await this.getItemsCount();
        for (let i=itemsCount-1; i>=0 ;i--)
        {
            const result = await waitForElementToBeVisible(this.deleteButtons.nth(i))
        if (!result) {throw new Error("Locator isn't visible")}
            await this.deleteButtons.nth(i).click();
        }

    }
    AddItemToCart = async () => {
        await this.ChooseItem()
        await this.addToCartButton.click()
    }
    ChooseItem = async () => {
        await this.listItems.first().click()
    }
   GoToCheckout = async () => {
    await this.checkoutIcon.last().click()
    await this.checkoutButton.last().click()
}
    TitleIsVisible = async ()=>{
        return waitForElementToBeVisible(this.checkoutTitle)
        
    }

}