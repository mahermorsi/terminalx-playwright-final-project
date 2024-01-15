import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';
import { LogicalOrCoalescingAssignmentOperator } from 'typescript';
import { log } from 'console';
export class PremiumPage extends BasePage{
    // LOCATORS
    private readonly showBy: Locator
    private readonly sortedItems:Locator
    constructor(page: Page){
        super(page);
        this.showBy=this.page.locator('//select[@name="sortField"]')
        this.sortedItems=this.page.locator('//ol[@class="product-list_yyTm"]//div[@class="row_2tcG bold_2wBM final-price_8CiX"]') 
        this.initPage();
    }


    async filterPriceByCheapestToMostExpensive(){
        await waitForElementToBeVisible(this.showBy)
        await this.showBy.selectOption("price_asc")
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