import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';

export class JustLandedPage extends BasePage{
    private readonly filterButton: Locator
    private readonly saleTypes: Locator
    private readonly itemsList: Locator

    constructor(page: Page){
        super(page)
        this.filterButton=this.page.locator('//li//h4[text()="                             מבצע                        "]')
        this.saleTypes = this.page.locator('//ol[@class="filter-items_1wKn"]/li')
        this.itemsList = this.page.locator('//ol[@class="product-list_yyTm"]//li')
        this.initPage();  
    }

    private async clickOnFilterButton(){
        const result = await waitForElementToBeVisible(this.filterButton)
        if (!result) {throw new Error("Locator isn't visible")}
        await this.filterButton.click()
    }

    async chooseSaleType(saleValue:string){
        await this.clickOnFilterButton();
        const result = await waitForElementToBeVisible(this.saleTypes.first())
        if (!result) {throw new Error("Locator isn't visible")}
        await this.saleTypes.locator(`//a[text()="${saleValue}"]`).click()
        await this.refreshPage()
    }

    private async getItemsListCount(){
        const result = await waitForElementToBeVisible(this.itemsList.first(),500,20)
        if (!result) return 0
        return this.itemsList.count()
    }

    async isSaleAndFinalPriceMatchesSale(saleValue: string){
        const numberOfProductsToCheck =await this.getItemsListCount();
        if (numberOfProductsToCheck===0) return false
        for (let i = 0; i < numberOfProductsToCheck; i++) {
            const saleInformation = this.itemsList.nth(i).locator('//div[@class="left_1yUs rtl_1_TU"]')
            const saleLocator = saleInformation.locator('//a')
            if (!await saleLocator.isVisible()) continue
            const saleType = await saleInformation.locator('//a').innerText()
            if (!saleType?.includes(saleValue)) return false
            if (!await this.isFinalPriceMatchesSale(saleInformation,saleValue)) return false
        }
        return true
    }
    async isFinalPriceMatchesSale(saleInformation:Locator,saleValue:string){
            const regularPrice = parseFloat(await saleInformation.locator('//div[@class="row_2tcG strikethrough_t2Ab regular-price_35Lt"]').innerText())
            const finalPrice =  parseFloat(await saleInformation.locator('//div[@class="row_2tcG bold_2wBM final-price_8CiX"]').innerText())
            const sale = parseInt(saleValue)
            const result = parseInt((100 - 100*finalPrice/regularPrice).toFixed(0))
        return sale === result
    }
}