import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';
export class AddItemToCart extends BasePage{
    // LOCATORS
    private readonly addToCartButton: Locator
    private readonly listItems: Locator
    private readonly checkoutButton: Locator
    private readonly checkoutIcon: Locator
    private readonly checkoutTitle: Locator
    
    constructor(page: Page){
        super(page);
        this.addToCartButton=this.page.locator('//button[text()="הוספה לסל"]')
        this.listItems = this.page.locator('//ol[@class="product-list_yyTm"]')
        this.checkoutIcon= this.page.locator("//a[@href='/checkout/cart']")
        this.checkoutButton= this.page.locator("//a[@href='/checkout']")
        this.checkoutTitle = this.page.locator("//div[text()='Check out']")

        this.initPage();
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