import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';

export class HeaderComponent extends BasePage{
    private readonly headersList: Locator

    constructor(page: Page){
        super(page)
        this.initPage();
        this.headersList=this.page.locator('//ul[@class="list_8stB"]//li/a')
    }

    ClickHeaderItemByIndex = async (i:number) => {
        await this.headersList.nth(i).click()
    }

    getHrefByIndex = async (i:number) => {
        return await this.headersList.nth(i).getAttribute('href')
    }
    
    getButtonsNumber = async () => {
        return await this.headersList.count()
    }
}