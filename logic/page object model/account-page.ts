import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/utils';
export class AccountPage extends BasePage{
    // LOCATORS
    private readonly firstName: Locator
    private readonly birthDate: Locator
    private readonly lastName: Locator
    private readonly logoutButton: Locator
    private readonly isLoggedout: Locator

    constructor(page: Page){
        super(page);
        this.firstName=this.page.locator('//button[@data-test-id="qa-header-profile-button"]')
        this.birthDate = this.page.locator('//input[@name="date_of_birth"]')
        this.lastName = this.page.locator('//input[@name="lastname"]')
        this.logoutButton = this.page.locator('//button[text()="Log Out"]')
        this.isLoggedout = this.page.locator('//div[text()="התחברות"]') 
        this.initPage();
    }

    async getUpdatedFirstName(){
        await this.refreshPage();
        const result = await waitForElementToBeVisible(this.firstName)
        if (!result) {throw new Error("Locator isn't visible")}
        return await this.firstName.textContent()
        
    }

    async getUpdatedBirthDate(){
        const result = await waitForElementToBeVisible(this.birthDate)
        if (!result) {throw new Error("Locator isn't visible")}
        return await this.birthDate.inputValue();
    }

    async getUpdatedLastName(){
        const result = await waitForElementToBeVisible(this.lastName)
        if (!result) {throw new Error("Locator isn't visible")}
        return await this.lastName.inputValue();
    }

    async clickLogout(){
        const result = await waitForElementToBeVisible(this.logoutButton)
        if (!result) {throw new Error("Locator isn't visible")}
        return await this.logoutButton.click()
    }

    async checkLoggedOut(){
        return await waitForElementToBeVisible(this.isLoggedout.first())
    }
}