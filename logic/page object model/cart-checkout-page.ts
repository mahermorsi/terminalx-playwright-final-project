import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';
import { extractNumberFromString } from '../../utils/utils';
export class CheckoutPage extends BasePage{
    // LOCATORS
    private readonly deleteButtons: Locator
    private readonly addToCartButton: Locator
    private readonly listCartItems: Locator
    private readonly checkoutButton: Locator
    private readonly checkoutIcon: Locator
    private readonly pricesList: Locator
    private readonly totalPrice: Locator
    private readonly theAddedItem: Locator
    private itemText : string|null=null

    constructor(page: Page){
        super(page);
        this.listCartItems = this.page.locator('//div[@class="cart-items-list_wmqo"]/div')
        this.addToCartButton=this.page.locator('//button[text()="הוספה לסל"]')
        this.theAddedItem =  this.page.getByTitle("כובע גרב עם לוגו / גברים")
        this.checkoutIcon= this.page.locator("//a[@href='/checkout/cart']")
        this.checkoutButton= this.page.locator("//a[@href='/checkout']")
        this.pricesList = this.page.locator('//div[@class="column_34Ze total-price_rLA-"]')
        this.totalPrice = this.page.locator('//div[@data-test-id="qa-order-totals-total-order"]')
        this.deleteButtons = this.page.locator('//div[@class="cart-items-list_wmqo"]/div//button[@class="tx-link-a icon_u36n remove_wqPe tx-link_29YD"]')
        this.initPage();
    }

    async getItemsCount(){
        await this.refreshPage();
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

    async sumUpAllProducts(){
        const itemsCount = await this.getItemsCount();
        let sum: number = 0;
        for (let i=itemsCount-1; i>=0 ;i--)
        {
            const result = await waitForElementToBeVisible(this.pricesList.nth(i))
        if (!result) {throw new Error("Locator isn't visible")}
            const priceString = await this.pricesList.nth(i).textContent()
            if (priceString){sum+=extractNumberFromString(priceString)}
        }
        return sum
    }
    
    async getTotalSum(){
        await this.refreshPage();
        const result = await waitForElementToBeVisible(this.totalPrice)
        if (!result) {throw new Error("Locator isn't visible")}
        const totalPriceString = await this.totalPrice.textContent()
        if (totalPriceString){return extractNumberFromString(totalPriceString)}
        return -1

    }

    AddItemToCart = async () => {
        await this.ChooseItem()
        await this.addToCartButton.click()
    }

    ChooseItem = async () => {
        this.itemText=await this.theAddedItem.first().getAttribute("title")
        this.theAddedItem.first().click()
        
    }

   GoToCheckout = async () => {
    await this.checkoutIcon.last().click()
    await this.checkoutButton.last().click()
    }

   itemIsVisible = async ()=>{
    return await waitForElementToBeVisible(this.page.locator(`//div[text()="${this.itemText}"]`));
    } 
}