import {Page} from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected readonly url: string;

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
    }

    async navigateTo() {
        await this.page.goto(this.url);
    }

    async redirectedToHome() {
        await this.page.waitForURL(this.url);
    }
}