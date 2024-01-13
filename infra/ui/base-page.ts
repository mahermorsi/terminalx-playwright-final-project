import { Page } from '@playwright/test';
export class BasePage{
    protected readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }
    async initPage(){
        await this.page.waitForLoadState()
    }
    async refreshPage(){
        await this.page.reload();
    }
    
}