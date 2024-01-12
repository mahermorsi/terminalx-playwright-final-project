import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';
export class AccountPage extends BasePage{
    // LOCATORS
    private readonly firstName: Locator
    private readonly birthDate: Locator
    private readonly lastName: Locator
    
    constructor(page: Page){
        super(page);
        this.firstName=this.page.locator('//button[@data-test-id="qa-header-profile-button"]')
        this.birthDate = this.page.locator('//input[@name="date_of_birth"]')
        this.lastName = this.page.locator('//input[@name="lastname"]')
        this.initPage();
    }
    async getUpdatedFirstName(){
        const result = await waitForElementToBeVisible(this.firstName,500,5)
        if (!result) {throw new Error("Locator isn't visible")}
        return await this.firstName.textContent()
    }
    async getUpdatedBirthDate(){
        const result = await waitForElementToBeVisible(this.birthDate,500,5)
        if (!result) {throw new Error("Locator isn't visible")}
        return await this.birthDate.inputValue();
    }
    async getUpdatedLastName(){
        const result = await waitForElementToBeVisible(this.lastName,500,5)
        if (!result) {throw new Error("Locator isn't visible")}
        return await this.lastName.inputValue();
    }
}