import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeEnabled, waitForElementToBeVisible } from '../../utils/wait-for-elements';

export class PremiumPage extends BasePage{
    // LOCATORS
    private readonly showBy: Locator
    private readonly pricesList:Locator
    private readonly colorButton:Locator
    private readonly blackColor:Locator
    private readonly blackItems:Locator
    private readonly itemsList: Locator

    constructor(page: Page){
        super(page);
        this.showBy=this.page.locator('//select[@name="sortField"]')
        this.colorButton=this.page.locator('//h4[contains(text(), "צבע")]')
        this.blackColor=this.page.locator('//div[contains(@style, "background-color: rgb(41, 41, 41)")]')
        this.pricesList=this.page.locator('//ol[@class="product-list_yyTm"]//div[@class="row_2tcG bold_2wBM final-price_8CiX"]')
        this.itemsList = this.page.locator('//ol[@class="product-list_yyTm"]//li')
        this.blackItems=this.page.locator('//div[@data-test-id="qa-color-item" and @class="color-item_1Y2Y selected_2fhA small_3Bcf" and @title="שחור : צבע"]')
        this.initPage();
    }


    async filterPriceByCheapestToMostExpensive(){
        await waitForElementToBeVisible(this.showBy)
        await this.showBy.selectOption("price_asc")
    }
    async  filterProductsByBLACKColor(){
        await waitForElementToBeVisible(this.colorButton)
        await this.colorButton.click()
        await waitForElementToBeEnabled(this.blackColor,1500,3)
        await this.blackColor.click()

    }

    async getItemsListCount(){
        const result = await waitForElementToBeVisible(this.itemsList.first(),500,20)
        if (!result) return 0
        return this.itemsList.count()
    }

    async validateFirst10ProductsAreBlackColored() {
        this.initPage();
        const numberOfProductsToCheck = Math.min(10, await this.getItemsListCount());
        if (numberOfProductsToCheck===0) return false
        for (let i = 0; i < numberOfProductsToCheck; i++) {
            const item = this.itemsList.nth(i).locator('//div[@class="swatch-wrap_3TDD"]//div[@data-test-id="qa-color-item"]')
            if (!await item.first().isVisible({timeout: 1000})) continue
            if (!item || !(await this.checkifBlackColorIsLocatedInsideElement(item))){
                return false}
        }
        return true;
    }
    
    async checkifBlackColorIsLocatedInsideElement(locator: Locator){
        await waitForElementToBeVisible(locator.first())
        const colorCount = await locator.count()
        for (let i=0;i<colorCount;i++){
            const color = await locator.nth(i).getAttribute("title")
            if (color && color.includes("שחור")) {
                return true
            }
        }
        return false
    }

    async  validateFirst_10_ProductsPricesAreSortedFromLowToHigh(){
        this.initPage();
        const numberOfProductsToCheck = Math.min(10, await this.getItemsListCount());
        if (numberOfProductsToCheck===1) return true
        for(let i=1;i<numberOfProductsToCheck;i++){
            const currentPrice = parseFloat(await this.pricesList.nth(i).innerText());
            const nextPrice = parseFloat(await this.pricesList.nth(i + 1).innerText());
            if(currentPrice > nextPrice){
                return false;
            }
        }
        return true;
    }
}