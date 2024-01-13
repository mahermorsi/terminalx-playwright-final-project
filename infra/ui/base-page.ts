import { Page } from '@playwright/test';
import { delay } from '../../utils/wait-for-elements';
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
    async waitForURLToBe(expectedURL: string, timeout=500,retries=10) {
    
        while (retries> 0) {
          const currentURL = this.page?.url();
          if (currentURL.includes(expectedURL)) {
            return true;
          }
          await delay(timeout)
          retries--
        }
        return false
      }
}