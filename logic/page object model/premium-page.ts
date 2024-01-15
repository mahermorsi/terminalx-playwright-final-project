import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { delay, waitForElementToBeEnabled, waitForElementToBeVisible } from '../../utils/wait-for-elements';
import { LogicalOrCoalescingAssignmentOperator } from 'typescript';
import { log } from 'console';
export class PremiumPage extends BasePage{
    // LOCATORS
    private readonly showBy: Locator
    private readonly sortedItems:Locator
    private readonly colorButton:Locator
    private readonly blackColor:Locator
    private readonly blackItems:Locator
    constructor(page: Page){
        super(page);
        this.showBy=this.page.locator('//select[@name="sortField"]')
        this.colorButton=this.page.locator('//h4[contains(text(), "צבע")]')
        this.blackColor=this.page.locator('//div[contains(@style, "background-color: rgb(41, 41, 41)")]')
        this.sortedItems=this.page.locator('//ol[@class="product-list_yyTm"]//div[@class="row_2tcG bold_2wBM final-price_8CiX"]')
        this.blackItems=this.page.locator('//div[@data-test-id="qa-color-item" and @title="שחור : צבע"]')
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
    async validateFirst10ProductsAreBlackColored() {
        this.initPage();
    
        const numberOfProductsToCheck = 10;
        
        for (let i = 1; i < numberOfProductsToCheck; i++) {
            const title = await this.blackItems.nth(i).getAttribute("title");
             if (!title || !title.includes("שחור")) {
                return false;
            }
        }
    
        return true;
    }
    
    
    async  validateFirst_10_ProductsPricesAreSortedFromLowToHigh(){
        for(let i=1;i<10;i++){
            if(parseFloat(await this.sortedItems.nth(i).innerText())>parseFloat(await this.sortedItems.nth(i+1).innerText())){
                return false;
            }

        }
        return true;
    }
}