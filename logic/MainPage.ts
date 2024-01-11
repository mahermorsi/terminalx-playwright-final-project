import { Locator, Page } from "@playwright/test";
import { BasePage } from "../infra/base-page";

export class MainPage extends BasePage {
    private searchButton: Locator;
    private searchInput: Locator;
    


    constructor(page: Page) {
        super(page)
        
        this.searchButton = this.page.locator('//button[@class="search-button_1ENs"]');
        this.searchInput = this.page.locator('//input[@data-test="search-input"]');
        this.initPage()
    }
    initPage = async () => {
        await this.page.waitForLoadState("domcontentloaded")
    }
    ClickSearchButton = async () => {
        await this.searchButton.click()
    }
    fillSearchInput = async (product: string) => {
        await this.ClickSearchButton();
        await this.searchInput.type(product, { delay: 50 });
        await this.searchInput.press('Enter');
        this.initPage()
    }
    

}