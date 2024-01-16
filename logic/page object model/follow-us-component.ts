import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';

export class FollowUsComponent extends BasePage{
    private readonly icons: Locator

    constructor(page: Page){
        super(page)
        this.icons=this.page.locator('//div[@class="socialWrapper_3GFm"]/a')
        this.initPage();  
    }

    ClickIconByIndex= async (i:number) => {
        const href = await this.getHrefByIndex(i)
        await this.icons.nth(i).click()
        return href
    }

    private getHrefByIndex = async (i:number) => {
        return await this.icons.nth(i).getAttribute('href')
    }

    getIconsNumber = async () => {
        return await this.icons.count()
    }
}