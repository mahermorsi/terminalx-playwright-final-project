import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { BasePage } from './base-page';

export class BrowserWrapper {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;

    async createNewPage<T extends BasePage>(pageClass: new (page: Page) => T) {
        if (!this.browser) {
            this.browser = await chromium.launch();
        }
        if (!this.context) {
            this.context = await this.browser.newContext();
        }
        if (!this.page) {
            this.page = await this.context.newPage();
        }

        const pageInstance = new pageClass(this.page);
        

        return pageInstance;
    }
    async navigateTo(url: string) {
        if (!this.page) {
            throw new Error('Browser is not launched. Call createNewPage() first.');
        }
        await this.page.goto(url);
    }
    async getPage() {
        if (!this.page) {
            throw new Error('Browser is not launched. Call launch() first.');
        }
        return this.page;
    }
    async reloadPage() {
        if (!this.page) {
            throw new Error('Browser is not launched. Call launch() first.');
        }
        await this.page.reload();
    }
    async setToFullScreen() {
        if (!this.page) {
            throw new Error('Browser is not launched. Call launch() first.');
        }
        await this.page.setViewportSize({ width: 1920, height: 1080 });
    }
    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async closePage() {
        if (this.page) {
            await this.page.close();
            this.page = null;
        }
    }
}