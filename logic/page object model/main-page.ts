import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';

export class MainPage extends BasePage{
    // LOCATORS
    private readonly userName: Locator
    private searchButton: Locator;
    private searchInput: Locator;
    private itemsList: Locator;
    
    constructor(page: Page){
        super(page);
        this.userName=this.page.locator('//button[@data-test-id="qa-header-profile-button"]')
        this.searchButton = this.page.locator('//button[@class="search-button_1ENs"]');
        this.searchInput = this.page.locator('//input[@data-test="search-input"]');
        this.itemsList = this.page.locator('(//ol[@class="product-list_yyTm"])/li');
        this.initPage();
    }

    async isGreetingShown(): Promise<boolean>{
        const result = await waitForElementToBeVisible(this.userName)
        if (!result) {throw new Error("Locator isn't visible")}
        const greetingMessage =  await this.userName.textContent()
        if (greetingMessage){return greetingMessage.includes("הי, ")}
        return false
    }
    ClickSearchButton = async () => {
        await this.searchButton.click()
    }
    fillSearchInput = async (brand: string) => {
        await this.ClickSearchButton();
        await this.searchInput.fill(brand);
        await this.searchInput.press('Enter');
        this.initPage()
    }
    async CheckBrandNameInFirstThreeItems(brand: string) {
        let temp = 1;
        for (let i = 1; i <= 3; i++) {
            const isElementVisible = await waitForElementToBeVisible(this.itemsList.nth(i));
    
            if (isElementVisible) {
                const itemText = await this.itemsList.nth(i).textContent();
                if (itemText && itemText.includes(brand)) {
                    temp++;
                }
            }
        }
        
        return temp === 4;
    }
}