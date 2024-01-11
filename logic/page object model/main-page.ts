import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';
export class MainPage extends BasePage{
    // LOCATORS
    private readonly userName: Locator
    
    constructor(page: Page){
        super(page);
        this.userName=this.page.locator('//button[@data-test-id="qa-header-profile-button"]')
        this.initPage();
    }
    
    async isGreetingShown(): Promise<boolean>{
        const result = await waitForElementToBeVisible(this.userName,500,5)
        if (!result) {throw new Error("Locator isn't visible")}
        const greetingMessage =  await this.userName.textContent()
        if (greetingMessage){return greetingMessage.includes("הי, ")}
        return false
    }
}