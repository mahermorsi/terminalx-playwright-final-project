import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/ui/base-page';
import { waitForElementToBeVisible } from '../../utils/utils'
import { error } from 'console';

export class HeaderComponent extends BasePage {
    private readonly headersList: Locator
    private readonly categoriseList: Locator

    constructor(page: Page) {
        super(page)
        this.initPage();
        this.headersList = this.page.locator('//ul[@class="list_8stB"]//li/a')
        this.categoriseList = this.page.locator('//div[@class="landing-page-buttons-section"]')
    }

    ClickOnCategory = async (category: string) => {
        const result = await waitForElementToBeVisible(this.categoriseList.first())
        if (!result) throw new Error("the locator isn't visibile")
        await this.categoriseList.locator(`//a[text()="${category}"]`).click()
    }
    ClickHeaderItemByIndex = async (i: number) => {
        const href = await this.getHrefByIndex(i)
        await this.headersList.nth(i).click()
        return href
    }

    private getHrefByIndex = async (i: number) => {
        return await this.headersList.nth(i).getAttribute('href')
    }

    getButtonsNumber = async () => {
        return await this.headersList.count()
    }
}