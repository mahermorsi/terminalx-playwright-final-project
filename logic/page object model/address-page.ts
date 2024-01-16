import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/utils';

export class AddressPage extends BasePage{
    private readonly addressList: Locator

    constructor(page: Page){
        super(page)
        this.initPage();
        this.addressList=this.page.locator('//tbody/tr')
    }
    
    async getTotalCountOfAddresses(){
        await this.refreshPage();
        const result = await waitForElementToBeVisible(this.addressList.first())
        if (!result) {throw new Error("Locator isn't visible")}
        return await this.addressList.count()
    }
}