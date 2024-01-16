import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/utils';

export class BrandsPage extends BasePage{
    // LOCATORS
    private readonly searchBar: Locator
    private readonly brandList: Locator
    private readonly clearSearchButton: Locator
    
    constructor(page: Page){
        super(page);
        this.searchBar = this.page.locator('//input[@type="text"]')
        this.brandList = this.page.locator('//ul[@class="brands-list_21nW"]//img')
        this.clearSearchButton = this.page.locator('//button[text()=" נקה חיפוש "]')
        this.initPage();
    }

    async fillInBrand(brand:string){
        const result = await waitForElementToBeVisible(this.searchBar)
        if (!result) {throw new Error("Locator isn't visible")}
        await this.searchBar.fill(brand)
    }

    async getCountOfFilteredBrands(){
        const result = await waitForElementToBeVisible(this.brandList.first(),500,5)
        if (!result) return 0
        return this.brandList.count()
    }
    async areFilteredBrandsMatchSearchInput(brand:string){
        const count = await this.getCountOfFilteredBrands()
        for (let i=0;i<count;i++){
            const brandText = await this.brandList.nth(i).getAttribute("alt")
            if (!brandText || !brandText.toLowerCase().includes(brand.toLowerCase())) {return false}
        }
        return true
    }

    async clearSearchBar(){
        const result = await waitForElementToBeVisible(this.clearSearchButton)
        if (!result) {throw new Error("Locator isn't visible")}
        await this.clearSearchButton.click()
    }
}
   